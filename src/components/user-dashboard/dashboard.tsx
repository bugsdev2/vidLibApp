import { useEffect, useState, useContext } from "react";
import "./dashboard.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { OLD_URL } from "../../constants/expressUrl";

export default function Dashboard() {
  interface Category {
    name: "string";
    category: "string";
    id: "number";
  }

  const { categoryName, setCategoryName } = useContext(Context);

  const [cookie, ,] = useCookies(["username"]);

  const navigate = useNavigate();

  const [zoom, setZoom] = useState("");
  const [shader, setShader] = useState("bg-[rgba(0,0,0,0.4)] transition");

  const [categories, setCategories] = useState<Category[]>([]);

  // IF COOKIE NOT SAVED, RETURN TO LOGIN SCREEN
  useEffect(() => {
    if (cookie.username === undefined || cookie.username === "admin") {
      navigate("/login");
    }
  }, [cookie.username]);

  // TWO FOLLOWING FUNCTIONS HANDLE WHAT HAPPENS WHEN THE MOUSE HOVERS OVER THE CARDS
  function handleMouseOver() {
    setZoom("scale-150 transition duration-500");
    setShader("bg-[rgba(0,0,0,0.2)] transition");
  }

  function handleMouseOut() {
    setZoom("duration-500");
    setShader("bg-[rgba(0,0,0,0.4)] transition");
  }

  // GETS CATEGORIES AND STORES IT IN A STATE VARIABLE
  useEffect(() => {
    axios.get(`${OLD_URL}/categories`).then((response) => {
      setCategories(response.data);
    });
  }, [categories]);

  function handleCategorySelect(category: Category) {
    setCategoryName(category.category);
    console.log(categoryName);
    navigate("/videos-page");
  }
  return (
    <>
      <main>
        <section
          id="container"
          className="h-[80dvh] flex flex-wrap gap-10 p-4 justify-center sm:justify-evenly"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              id="card"
              className="cursor-pointer grayscale hover:grayscale-0 h-fit"
            >
              <div
                id="card-img-container"
                onClick={() => handleCategorySelect(category)}
                className="w-72 h-40 border overflow-hidden rounded-xl relative hover:border-yellow-500 "
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
                  <span className="text-xl text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold select-none ">
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
