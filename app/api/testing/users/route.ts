import { users } from "@/db/schema"
import { db } from "@/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/dist/server/web/spec-extension/response"


// Create a new user in the database
export const POST = async (request: Request) => {
    if(process.env.NODE_ENV === "production") {
        return NextResponse.json({ message: "This endpoint is not available in production" }, { status: 403 })
    }

    const { username, name, password } = await request.json()
    if(!username || !name || !password) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, username)
    })
    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    await db.insert(users).values({ username, name, passwordHash }).execute()
    return NextResponse.json({ message: "User created" }, { status: 201 })
}