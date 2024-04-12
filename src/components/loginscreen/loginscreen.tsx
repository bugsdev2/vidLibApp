import "./loginscreen.css";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const navigate = useNavigate();

  return (
    <>
      <main className="text-light bg-dark h-[100dvh]">
        <header className="flex p-3 justify-between">
          <div className="bi bi-justify invisible text-2xl cursor-pointer"></div>
          <div className="text-2xl font-bold cursor-pointer">
            <span className="uppercase">Movie</span>{" "}
            <span className="text-primary uppercase">Library</span>
          </div>
          <div className="bi bi-person invisible text-2xl cursor-pointer"></div>
        </header>
        <section className="flex justify-center">
          <div className="flex gap-3">
            <button className="btn-outline" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </section>
        <section
          id="banner"
          className="mt-5 h-[83dvh] flex justify-center items-center bg-[url('/banner5.png')] md:bg-[url('/banner4.png')]"
        >
          <div id="shader"></div>
          <div id="content">
            <div id="shader"></div>
            <div className="flex justify-center">
              <span className="text-light mb-5 font-bold">
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
                    className="bg-primary px-3 rounded-r-lg relative -right-3 active:bg-darkred"
                  >
                    <span className="bi bi-chevron-right"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
