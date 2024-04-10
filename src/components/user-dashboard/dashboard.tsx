export default function Dashboard() {
  return (
    <>
      <main className="grid grid-cols-4 grid-rows-[4rem_1fr_4rem]">
        <header className="col-span-4 text-white flex justify-center items-center">
          <span className="text-2xl font-bold">Video Library</span>
        </header>
        <nav className="border min-h-[100dvh] border-red-500 bg-dark p-3 text-white text-center pt-28">
          <ul>
            <li>Home</li>
            <li>Categories</li>
          </ul>
        </nav>
        <section className="border border-blue-400 col-span-3 text-white p-3">
          Hello
        </section>
      </main>
    </>
  );
}
