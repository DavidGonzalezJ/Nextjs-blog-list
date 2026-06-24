import { redirect } from "next/navigation"
import { getCurrentUser } from "@/app/services/session"
import { generateToken } from "@/app/actions/users"

export default async function MePage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-6">My Profile</h1>
        <div className="space-y-2 text-zinc-300 text-sm">
          <p>
            <span className="text-zinc-500">Name:</span>{" "}
            <span className="text-zinc-100">{user.name}</span>
          </p>
          <p>
            <span className="text-zinc-500">Username:</span>{" "}
            <span className="text-zinc-100">{user.username}</span>
          </p>
        </div>
      </div>

      <hr className="border-zinc-800" />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">API Token</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <p className="text-sm text-zinc-400">Current token:</p>
          {user.token ? (
            <p className="font-mono text-sm text-violet-300 break-all select-all bg-zinc-800 rounded-lg px-3 py-2">
              {user.token}
            </p>
          ) : (
            <p className="text-sm text-zinc-600 italic">No token generated yet.</p>
          )}
        </div>
        <form action={generateToken}>
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  )
}
