"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { errors: { username: "", name: "", password: "", passwordConfirm: "" }, values: { username: "", name: "", password: "" } })


  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required defaultValue={state.values.username} />
            {state.errors.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required defaultValue={state.values.name} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
            {state.errors.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required />
            {state.errors.passwordConfirm && <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>}
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}