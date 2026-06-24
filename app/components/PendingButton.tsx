"use client"

import { useFormStatus } from "react-dom"

interface Props {
  children: React.ReactNode
  pendingLabel: string
  className?: string
  pendingClassName?: string
}

export default function PendingButton({ children, pendingLabel, className, pendingClassName }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={pending ? (pendingClassName ?? className) : className}
    >
      {pending ? pendingLabel : children}
    </button>
  )
}
