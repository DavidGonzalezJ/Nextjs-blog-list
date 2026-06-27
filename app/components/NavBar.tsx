"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent shrink-0"
        >
          bloglist
        </Link>

        <div className="flex items-center gap-5 text-sm text-zinc-400">
          <Link href="/blogs" className="hover:text-violet-400 transition-colors">
            blogs
          </Link>
          <Link href="/users" className="hover:text-violet-400 transition-colors">
            users
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-4 text-sm">
          {session ? (
            <>
              <Link
                href="/blogs/new"
                className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-full font-medium transition-colors"
              >
                + new post
              </Link>
              <Link href="/me" aria-label="me" className="text-zinc-500 hidden sm:inline hover:text-violet-400 transition-colors">
                <em className="text-zinc-300 not-italic">{session.user?.name}</em>
              </Link>
              <button
                onClick={() => signOut()}
                className="text-zinc-400 hover:text-rose-400 transition-colors"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-zinc-400 hover:text-violet-400 transition-colors">
                login
              </Link>
              <Link
                href="/register"
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-1.5 rounded-full font-medium transition-colors"
              >
                register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}