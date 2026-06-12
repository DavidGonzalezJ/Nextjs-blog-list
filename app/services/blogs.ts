export interface Blog {
    id: number;
    title: string;
    author: string;
    url: string;
    likes: number;
}

const blogs: Blog[] = [
    {
        id: 1,
        title: 'First Blog',
        author: 'John Doe',
        url: 'https://example.com/first-blog',
        likes: 10,
    },
    {
        id: 2,
        title: 'Second Blog',
        author: 'Jane Doe',
        url: 'https://example.com/second-blog',
        likes: 20,
    },
];

export function getBlogs(): Blog[] {
    return blogs;
}

export function addBlog(title: string, author: string, url: string): void {
    const newBlog: Blog = {
        id: blogs.length + 1,
        title,
        author,
        url,
        likes: 0,
    };
    blogs.push(newBlog);
}