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
              <span className="text-xl text-center text-primary mb-5 font-bold">
                Discover Timeless Classics
              </span>
            </div>
            <div className="text-center w-60 md:w-96">
              Immerse yourself in the vibrant cultures and landscapes of South
              India through our handpicked selection of movies.
            </div>
            <div className="text-center w-60 md:w-96">
              From the rustic charm of village life to the bustling streets of
              metropolitan cities, each film offers a unique glimpse into the
              heart and soul of the region.
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
