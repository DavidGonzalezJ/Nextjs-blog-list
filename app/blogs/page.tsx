import { getBlogs } from "../services/blogs"
import { searchByText } from "../actions/blogs"
import Link from "next/link"

const Blogs = async ({searchParams}: {searchParams: Promise<{search?: string}>}) => {
  const { search } = await searchParams
  let blogs = await getBlogs()
  if (search) {
    blogs = blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
  }
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-100">Blogs</h2>
        <span className="text-zinc-500 text-sm">{sortedBlogs.length} posts</span>
      </div>

      <form action={searchByText} className="flex gap-2">
        <input
          name="search"
          type="search"
          placeholder="Search blogs..."
          defaultValue={search}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all"
        />
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          Search
        </button>
      </form>

      <ul className="space-y-3">
        {sortedBlogs.map(blog => (
          <li
            key={blog.id}
            className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-lg font-semibold text-zinc-100 group-hover:text-violet-400 transition-colors"
                >
                  {blog.title}
                </Link>
                <p className="text-zinc-400 text-sm mt-0.5">by {blog.author}</p>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400/60 hover:text-violet-400 text-xs mt-1 block truncate transition-colors"
                >
                  {blog.url}
                </a>
              </div>
              <span className="shrink-0 flex items-center gap-1.5 bg-zinc-800 text-zinc-300 text-sm rounded-full px-3 py-1">
                ❤️ {blog.likes}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {sortedBlogs.length === 0 && (
        <p className="text-center text-zinc-500 py-12">No blogs found.</p>
      )}
    </div>
  )
}
export default Blogs