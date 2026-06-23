import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likePost } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4">
        <h2 className="text-3xl font-bold text-zinc-100 leading-tight">{blog.title}</h2>

        <p className="text-zinc-400">
          by <span className="text-zinc-200 font-medium">{blog.author}</span>
        </p>

        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 hover:text-violet-300 text-sm break-all transition-colors block"
        >
          {blog.url}
        </a>

        <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
          <span className="flex items-center gap-1.5 bg-zinc-800 text-zinc-300 text-sm rounded-full px-4 py-1.5">
            ❤️ {blog.likes} likes
          </span>
          <form action={likePost}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              👍 Like
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BlogPage