"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"
import { auth } from "@/auth"

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