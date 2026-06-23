"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const registerUser = async (prevState: {errors: {username?: string, name?: string, password?: string, passwordConfirm?: string}, values: {username: string, name: string, password: string}} ,
  formData: FormData) => {

  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  //Error handling for form validation
  const errors = {username: "", name: "", password: "", passwordConfirm: ""}

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }
  if (await db.query.users.findFirst( {
    where: eq(users.username, username)
  })) {
    errors.username = "Username is already taken"
  }
  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }
  if (errors.username || errors.name || errors.password || errors.passwordConfirm) {
    return { errors, values: { username, name, password } }
  }

  //Insert new user into the database
  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}