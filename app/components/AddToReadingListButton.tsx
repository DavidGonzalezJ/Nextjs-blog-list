"use client"

import { useActionState, useEffect } from "react"
import { addToReadingList } from "@/app/actions/blogs"
import { useNotification } from "./NotificationContext"
import PendingButton from "./PendingButton"

export default function AddToReadingListButton({ blogId }: { blogId: number }) {
  const { showNotification } = useNotification()
  const [state, formAction] = useActionState(addToReadingList, null)

  useEffect(() => {
    if (state?.alreadyExists) {
      showNotification("This blog is already in your reading list.", "error")
    }
  }, [state, showNotification])

  return (
    <form action={formAction}>
      <input type="hidden" name="blogId" value={blogId} />
      <PendingButton
        pendingLabel="Saving..."
        className="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-5 py-1.5 rounded-full text-sm font-medium transition-colors"
        pendingClassName="bg-zinc-800 text-zinc-500 px-5 py-1.5 rounded-full text-sm font-medium opacity-70 cursor-not-allowed"
      >
        🔖 Add to reading list
      </PendingButton>
    </form>
  )
}
