import { db } from "../../db";
import { Blog } from "./blogs";

export type user = {
  id: number;
  username: string;
  name: string;
  blogs: Blog[];
}

export const getUsers = async () => {
  return db.query.users.findMany();
}

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      blogs: true,
    },
  });
}