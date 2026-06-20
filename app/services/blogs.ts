import { eq, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export type Blog = {
    id: number;
    title: string;
    author: string;
    url: string;
    likes: number;
}

export async function getBlogs(): Promise<Blog[]> {
    return db.query.blogs.findMany();
}

export async function addBlog(title: string, author: string, url: string): Promise<void> {
    const user = await db.query.users.findFirst({
        orderBy: sql`RANDOM()`,
    });
    await db.insert(blogs).values({
        title,
        author,
        url,
        likes: 0,
        userId: user?.id || 1, // Assign a default user ID if no user is found
    });
}

export async function getBlogById(id: number): Promise<Blog | undefined> {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id),
    });
}

export async function likeBlog(id: number): Promise<void> {
    const blog = await getBlogById(id);
    if (blog) {
        await db.update(blogs)
            .set({ likes: blog.likes + 1 })
            .where(eq(blogs.id, id));

    }
}