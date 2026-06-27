import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { getCurrentUser } from "@/app/services/session"
import { generateToken } from "@/app/actions/users"
import { markAsRead } from "@/app/actions/blogs"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import PendingButton from "@/app/components/PendingButton"

export default async function MePage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const readingListEntries = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: { blog: true },
  })

  const unread = readingListEntries.filter((e) => !e.read)
  const read = readingListEntries.filter((e) => e.read)

  return (
    <div className="max-w-2xl space-y-10">
      <div data-testid="user-profile">
        <h1 className="text-3xl font-bold text-zinc-100 mb-6">My Profile</h1>
        <div className="space-y-2 text-zinc-300 text-sm">
          <p>
            <span className="text-zinc-500">Name:</span>{" "}
            <span className="text-zinc-100" data-testid="user-name">{user.name}</span>
          </p>
          <p>
            <span className="text-zinc-500">Username:</span>{" "}
            <span className="text-zinc-100" data-testid="user-username">{user.username}</span>
          </p>
        </div>
      </div>

      <hr className="border-zinc-800" />

      <div className="space-y-4" data-testid="reading-list-section">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-100">Reading List</h2>
          <span className="text-zinc-500 text-sm">{readingListEntries.length} saved</span>
        </div>

        {readingListEntries.length === 0 ? (
          <p className="text-sm text-zinc-500 italic bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-8 text-center" data-testid="empty-reading-list">
            No blogs saved yet. Browse blogs and add them to your reading list.
          </p>
        ) : (
          <div className="space-y-6">
            {unread.length > 0 && (
              <div className="space-y-3" data-testid="unread-section">
                <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
                  Unread · {unread.length}
                </h3>
                <ul className="space-y-3">
                  {unread.map((entry) => (
                    <li key={entry.id} className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <Link
                            href={`/blogs/${entry.blog.id}`}
                            className="text-zinc-100 font-semibold group-hover:text-violet-400 transition-colors"
                          >
                            {entry.blog.title}
                          </Link>
                          <p className="text-zinc-400 text-sm mt-0.5">by {entry.blog.author}</p>
                          <a
                            href={entry.blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400/60 hover:text-violet-400 text-xs mt-1 block truncate transition-colors"
                          >
                            {entry.blog.url}
                          </a>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="flex items-center gap-1.5 bg-zinc-800 text-zinc-300 text-sm rounded-full px-3 py-1">
                            ❤️ {entry.blog.likes}
                          </span>
                          <form action={markAsRead}>
                            <input type="hidden" name="entryId" value={entry.id} />
                            <PendingButton
                              pendingLabel="Saving..."
                              data-testid={`mark-read-${entry.id}`}
                              className="text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1 rounded-full transition-colors"
                              pendingClassName="text-xs text-emerald-600 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-full opacity-60 cursor-not-allowed"
                            >
                              ✓ Mark as read
                            </PendingButton>
                          </form>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {unread.length === 0 && (
              <p className="text-sm text-zinc-500 italic" data-testid="no-unread-blogs">All blogs read.</p>
            )}

            {read.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-zinc-600 uppercase tracking-wider">
                  Read · {read.length}
                </h3>
                <ul className="space-y-3">
                  {read.map((entry) => (
                    <li key={entry.id} className="group bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-5 transition-all opacity-60">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <Link
                            href={`/blogs/${entry.blog.id}`}
                            className="text-zinc-400 font-semibold group-hover:text-zinc-300 transition-colors line-through decoration-zinc-600"
                          >
                            {entry.blog.title}
                          </Link>
                          <p className="text-zinc-500 text-sm mt-0.5">by {entry.blog.author}</p>
                        </div>
                        <span className="shrink-0 flex items-center gap-1.5 bg-zinc-800/60 text-zinc-500 text-sm rounded-full px-3 py-1">
                          ❤️ {entry.blog.likes}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <hr className="border-zinc-800" />

      <div className="space-y-4" data-testid="api-token-section">
        <h2 className="text-xl font-semibold text-zinc-100">API Token</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3" data-testid="token-display">
          <p className="text-sm text-zinc-400">Current token:</p>
          {user.token ? (
            <p className="font-mono text-sm text-violet-300 break-all select-all bg-zinc-800 rounded-lg px-3 py-2" data-testid="api-token">
              {user.token}
            </p>
          ) : (
            <p className="text-sm text-zinc-600 italic" data-testid="no-token-message">No token generated yet.</p>
          )}
        </div>
        <form action={generateToken}>
          <button
            type="submit"
            data-testid="generate-token-button"
            className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  )
}
