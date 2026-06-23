import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-zinc-950">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main className="max-w-4xl mx-auto px-6 py-10">
              {children}
            </main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}