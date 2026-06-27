"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"
import { useRouter } from "next/navigation"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog,
    { errors: { title: "", author: "", url: "" },
      values: { title: "", author: "", url: "" },
      success: false })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!", "success")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6">New post</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <form action={formAction} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              required
              defaultValue={state.values?.title}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
            />
            {state.errors.title && <p className="text-rose-400 text-sm">{state.errors.title}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="author">
              Author
            </label>
            <input
              id="author"
              type="text"
              name="author"
              required
              defaultValue={state.values?.author}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
            />
            {state.errors.author && <p className="text-rose-400 text-sm">{state.errors.author}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="url">
              URL
            </label>
            <input
              id="url"
              type="text"
              name="url"
              required
              defaultValue={state.values?.url}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
            />
            {state.errors.url && <p className="text-rose-400 text-sm">{state.errors.url}</p>}
          </div>

          <button
            type="submit"
            data-testid="create-blog-button"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-xl font-semibold transition-colors mt-2"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewBlog