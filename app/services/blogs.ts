export interface Blog {
    id: string;
    title: string;
    author: string;
    url: string;
    likes: number;
}

const blogs: Blog[] = [
    {
        id: '1',
        title: 'First Blog',
        author: 'John Doe',
        url: 'https://example.com/first-blog',
        likes: 10,
    },
    {
        id: '2',
        title: 'Second Blog',
        author: 'Jane Doe',
        url: 'https://example.com/second-blog',
        likes: 20,
    },
];

export function getBlogs(): Blog[] {
    return blogs;
}