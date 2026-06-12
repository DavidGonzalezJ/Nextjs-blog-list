import { getBlogs } from "../services/blogs"
import Link from "next/link"

const Blogs = () => {
  const blogs = getBlogs()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {sortedBlogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <b>{blog.title}</b>
            </Link> by {blog.author} - <b>{blog.likes}</b> likes 
            (<a href={blog.url}>{blog.url}</a>)
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs