import { blogs, readingList, users } from "@/db/schema"
import { db } from "@/db"
import { NextResponse } from "next/dist/server/web/spec-extension/response"

// Delete all users and blogs from the database
export const DELETE = async (request: Request) => {
    if(process.env.NODE_ENV === "production") {
        return NextResponse.json({ message: "This endpoint is not available in production" }, { status: 403 })
    }

    await db.delete(readingList).execute()
    await db.delete(blogs).execute()
    await db.delete(users).execute()
    return NextResponse.json({ message: "Database reset" }, { status: 200 })
}