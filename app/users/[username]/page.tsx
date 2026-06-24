import Link from "next/link"
import { getUserWithBlogs } from "@/app/services/users"
import { notFound } from "next/navigation"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300 text-2xl font-bold shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">{user.name}</h2>
          <p className="text-zinc-500 text-sm mt-0.5">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-100">Blogs</h3>
          <span className="text-zinc-500 text-sm">{user.blogs.length} posts</span>
        </div>
        {user.blogs.length > 0 ? (
          <ul className="space-y-3">
            {user.blogs.map((blog) => (
              <li key={blog.id} className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="text-zinc-100 font-semibold group-hover:text-violet-400 transition-colors"
                    >
                      {blog.title}
                    </Link>
                    <p className="text-zinc-400 text-sm mt-0.5">by {blog.author}</p>
                  </div>
                  <span className="shrink-0 flex items-center gap-1.5 bg-zinc-800 text-zinc-300 text-sm rounded-full px-3 py-1">
                    ❤️ {blog.likes}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-zinc-500 py-12 bg-zinc-900 border border-zinc-800 rounded-2xl">
            No posts yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default UserPage