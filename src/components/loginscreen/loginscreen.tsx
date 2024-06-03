import "./loginscreen.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [cookie, ,] = useCookies(["username"]);

  useEffect(() => {
    if (cookie.username !== undefined) {
      if (cookie.username === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [cookie.username]);

  return (
    <>
      <main className="text-light bg-dark h-[100dvh]">
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
          className="mt-5 h-full flex justify-center items-center bg-[url('/banner5.png')] md:bg-[url('/banner4.png')]"
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
