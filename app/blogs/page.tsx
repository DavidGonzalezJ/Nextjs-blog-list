import { getBlogs } from "../services/blogs"
import { searchByText } from "../actions/blogs"
import Link from "next/link"

const Blogs = async ({searchParams}: {searchParams: Promise<{search?: string}>}) => {
  const { search } = await searchParams
  let blogs = getBlogs()
  if (search) {
    blogs = blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
  }
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2>Blogs</h2>
      <form action={searchByText}>
        <input name="search" type="search" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
      <br />
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