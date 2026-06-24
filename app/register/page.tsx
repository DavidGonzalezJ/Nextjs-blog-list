"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"
import Link from "next/link"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { errors: { username: "", name: "", password: "", passwordConfirm: "" }, values: { username: "", name: "", password: "" } })

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6">Register</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <form action={formAction} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              required
              defaultValue={state.values.username}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
            />
            {state.errors.username && <p className="text-rose-400 text-sm">{state.errors.username}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              defaultValue={state.values.name}
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
            {state.errors.password && <p className="text-rose-400 text-sm">{state.errors.password}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
            />
            {state.errors.passwordConfirm && <p className="text-rose-400 text-sm">{state.errors.passwordConfirm}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-xl font-semibold transition-colors mt-2"
          >
            Register
          </button>
        </form>
        <p className="text-center text-zinc-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}