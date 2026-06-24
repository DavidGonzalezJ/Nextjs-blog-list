import { users } from "@/db/schema"
import { db } from "@/db"
import { eq } from "drizzle-orm/sql/expressions/conditions"

export const GET = async (request: Request) => {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")
    if (!token) {
        return new Response("Unauthorized", { status: 401 })
    }

    const user = await db.query.users.findFirst({
        where: eq(users.token, token)
    })

    if (!user) {
        return new Response("Unauthorized", { status: 401 })
    }

    return new Response(JSON.stringify(user), { status: 200 })
}