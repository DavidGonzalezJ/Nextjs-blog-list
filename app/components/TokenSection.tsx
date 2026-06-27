"use client"

import { useActionState } from "react"
import { generateToken } from "../actions/users"

export default function TokenSection({ initialToken }: { initialToken: string | null }) {
  const [token, formAction] = useActionState(generateToken, initialToken)

  return (
    <div className="space-y-4" data-testid="api-token-section">
      <h2 className="text-xl font-semibold text-zinc-100">API Token</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3" data-testid="token-display">
        <p className="text-sm text-zinc-400">Current token:</p>
        {token ? (
          <p className="font-mono text-sm text-violet-300 break-all select-all bg-zinc-800 rounded-lg px-3 py-2" data-testid="api-token">
            {token}
          </p>
        ) : (
          <p className="text-sm text-zinc-600 italic" data-testid="no-token-message">No token generated yet.</p>
        )}
      </div>
      <form action={formAction}>
        <button
          type="submit"
          data-testid="generate-token-button"
          className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
        >
          Generate New Token
        </button>
      </form>
    </div>
  )
}
