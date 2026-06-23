"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const isSuccess = type === "success"

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-3
        px-5 py-4 rounded-2xl
        shadow-2xl backdrop-blur-sm
        border text-sm font-medium
        transition-all duration-300
        ${
          isSuccess
            ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300 shadow-emerald-900/50"
            : "bg-rose-950/90 border-rose-500/40 text-rose-300 shadow-rose-900/50"
        }
      `}
    >
      <span className={`text-lg ${isSuccess ? "text-emerald-400" : "text-rose-400"}`}>
        {isSuccess ? "✓" : "✕"}
      </span>
      <span>{message}</span>
    </div>
  )
}