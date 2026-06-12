"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  addBlog(title, author, url)
  
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likePost = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  likeBlog(id)
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