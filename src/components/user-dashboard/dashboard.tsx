import { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [cookie, ,] = useCookies(["username"]);

  const navigate = useNavigate();

  const [zoom, setZoom] = useState("");
  const [shader, setShader] = useState("bg-[rgba(0,0,0,0.3)] transition");

  const [categories, setCategories] = useState([]);

  // IF COOKIE NOT SAVED, RETURN TO LOGIN SCREEN
  useEffect(() => {
    if (cookie.username === "" || cookie.username === undefined)
      navigate("/login");
    axios
      .get(`https://vidlibapp-api.onrender.com/check-user/${cookie.username}`)
      .then((res) => {
        console.log(res.data1);
      });
  }, [cookie.username]);

  // TWO FOLLOWING FUNCTIONS HANDLE WHAT HAPPENS WHEN THE MOUSE HOVERS OVER THE CARDS
  function handleMouseOver() {
    setZoom("scale-150 transition duration-500");
    setShader("bg-[rgba(0,0,0,0.6)] transition");
  }

  function handleMouseOut() {
    setZoom("duration-500");
    setShader("bg-[rgba(0,0,0,0.4)] transition");
  }

  // GETS CATEGORIES AND STORES IT IN A STATE VARIABLE
  useEffect(() => {
    axios
      .get("https://vidlibapp-api.onrender.com/categories")
      .then((response) => {
        setCategories(response.data);
      });
  }, [categories]);
  return (
    <>
      <main>
        <section
          id="container"
          className="h-[80dvh] flex flex-wrap gap-10 p-4 justify-center sm:justify-evenly"
        >
          {categories.map((category) => (
            <div
              id="card"
              className="cursor-pointer grayscale hover:grayscale-0 h-fit"
            >
              <div
                id="card-img-container"
                className="w-72 h-40 border overflow-hidden rounded-xl relative  hover:border-yellow-500"
              >
                <img
                  id="image"
                  className={` ${zoom}`}
                  src={`/directors/${category.category}.jpg`}
                  alt={`Image of ${category.name}`}
                />
                <div
                  id="card-title"
                  onMouseOver={() => handleMouseOver()}
                  onMouseOut={() => handleMouseOut()}
                  className={`${shader} inset-0 absolute`}
                >
                  <span className="text-xl flex justify-center items-center h-full font-bold hover:text-yellow-500 select-none active:">
                    {category.name}
                  </span>
                </div>
              </div>
              <div id="card-title"></div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
