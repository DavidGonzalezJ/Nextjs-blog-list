"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"
import { auth } from "@/auth"
import { getCurrentUser } from "../services/session"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const createBlog = async (
  prevState: {errors: {title?: string, author?: string, url?: string},
    values: {title: string, author: string, url: string},
    success: boolean},
  formData: FormData) => {

  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  //Error handling for form validation
  const errors = {title: "", author: "", url: ""}

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }
  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }
  if (errors.title || errors.author || errors.url) {
    return { errors, values: { title, author, url }, success: false }
  }

  // Call the addBlog function to add the new blog
  await addBlog(title, author, url)
  
  revalidatePath("/blogs")
  return { errors: { title: "", author: "", url: "" }, values: { title: "", author: "", url: "" }, success: true }
}

export const likePost = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const searchByText = async (formData: FormData) => {
  const searchText = formData.get("search") as string
  if (!searchText) {
    redirect("/blogs")
  }
  else {
    redirect(`/blogs?search=${encodeURIComponent(searchText)}`)
  }
}

export const addToReadingList = async (
  _prevState: { alreadyExists: boolean } | null,
  formData: FormData,
) => {
  const blogId = Number(formData.get("blogId"))
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const existing = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)),
  })
  if (existing) return { alreadyExists: true }

  await db.insert(readingList).values({ userId: user.id, blogId })
  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
  return { alreadyExists: false }
}

export const markAsRead = async (formData: FormData) => {
  const entryId = Number(formData.get("entryId"))
  await db.update(readingList).set({ read: true }).where(eq(readingList.id, entryId))
  revalidatePath("/me")
}