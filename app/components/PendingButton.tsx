"use client"

import { useFormStatus } from "react-dom"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  pendingLabel: string
  pendingClassName?: string
}

export default function PendingButton({ children, pendingLabel, className, pendingClassName, ...rest }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={pending ? (pendingClassName ?? className) : className}
      {...rest}
    >
      {pending ? pendingLabel : children}
    </button>
  )
}
