const Home = () => {
  return (
    <div className="flex flex-col gap-6 py-16">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
        bloglist
      </h1>
      <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
        A test app for{" "}
        <a
          href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
        >
          Full Stack Open Next.js
        </a>
      </p>
    </div>
  )
}
export default Home