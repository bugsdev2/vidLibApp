import "./loginscreen.css";

export default function LoginScreen() {
  return (
    <>
      <main className="text-light bg-dark">
        <header className="flex p-3 justify-between">
          <div className="bi bi-justify text-2xl cursor-pointer"></div>
          <div className="text-xl font-bold cursor-pointer">Movie Library</div>
          <div className="bi bi-person text-2xl cursor-pointer"></div>
        </header>
        <section className="flex justify-center">
          <div className="flex gap-3">
            <button className="btn-outline">Login</button>
            <button className="btn">Sign Up</button>
          </div>
        </section>
        <section
          id="banner"
          className="mt-5 h-[80vh] flex justify-center items-center"
        >
          <div id="shader"></div>
          <div id="content">
            <div id="shader"></div>
            <div className="flex justify-center">
              <span className="text-light mb-5">
                Enter your Email ID to Sign Up
              </span>
            </div>
            <div>
              <form className="flex justify-center bg-dark rounded-lg w-full">
                <div className="border border-gray-300 px-3 rounded-lg flex justify-around w-full">
                  <input
                    type="search"
                    className="bg-dark py-1 rounded-xl focus:outline-none focus:border-none"
                  />
                  <button
                    type="button"
                    className="bi bi-chevron-right"
                  ></button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
