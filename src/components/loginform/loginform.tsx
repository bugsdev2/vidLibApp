import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <>
      <div className="text-light text-center h-[88dvh]">
        <header className="flex p-3 justify-center">
          <Link to="/" className="text-2xl font-bold cursor-pointer">
            <span className="uppercase">Movie</span>{" "}
            <span className="text-primary uppercase">Library</span>
          </Link>
        </header>
        <section
          id="banner"
          className="flex justify-center items-start mt-5 bg-[url('/banner5.png')] md:bg-[url('/banner4.png')] h-full"
        >
          <div id="shader"></div>
          <form
            id="content"
            action=""
            className="rounded-md flex mt-36 flex-col gap-3"
          >
            <div id="shader"></div>
            <div className="text-lightred">Login to your Account</div>

            <div className="flex flex-col md:flex-row gap-2 justify-between">
              <label htmlFor="username">User Name</label>
              <input
                id="username"
                name="username"
                type="text"
                className="bg-dark border rounded-lg px-2"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-between">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="bg-dark border rounded-lg px-2"
              />
            </div>
            <div>
              <button type="button" className="btn mt-3">
                Login
              </button>
              <div>
                <small>
                  <Link to="/signup" className="text-primary">
                    Click here
                  </Link>{" "}
                  to create a new account
                </small>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
