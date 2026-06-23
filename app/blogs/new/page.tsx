"use client"

import { useActionState } from "react"
import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { errors: { title: "", author: "", url: "" }, values: { title: "", author: "", url: "" } })


  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input id="title" type="text" name="title" required defaultValue={state.values?.title} />
            {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
          </label>
        </div>
        <div>
          <label>
            Author
            <input id="author" type="text" name="author" required defaultValue={state.values?.author} />
            {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
          </label>
        </div>
        <div>
          <label>
            URL
            <input id="url" type="text" name="url" required defaultValue={state.values?.url} />
            {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog