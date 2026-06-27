"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      showNotification("Logged in successfully!", "success")
      router.push("/")
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6">Login</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p data-testid="error-message" className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
            />
          </div>
          <button
            type="submit"
            data-testid="login-button"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-xl font-semibold transition-colors mt-2"
          >
            Login
          </button>
        </form>
        <p className="text-center text-zinc-500 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-violet-400 hover:text-violet-300 transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}