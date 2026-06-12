import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <b>{blog.title}</b> by {blog.author} - <b>{blog.likes}</b> likes 
            (<a href={blog.url}>{blog.url}</a>)
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs