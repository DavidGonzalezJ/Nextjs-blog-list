import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-100">Users</h2>
        <span className="text-zinc-500 text-sm">{users.length} members</span>
      </div>

      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300 font-semibold shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-zinc-100 font-medium group-hover:text-violet-400 transition-colors">{user.name}</p>
                <p className="text-zinc-500 text-sm">@{user.username}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {users.length === 0 && (
        <p className="text-center text-zinc-500 py-12">No users found.</p>
      )}
    </div>
  )
}

export default Users