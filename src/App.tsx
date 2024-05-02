import "./App.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import LoginScreen from "./components/loginscreen/loginscreen";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/loginform/loginform";
import SignUpForm from "./components/signupform/signupform";
import UserDashboard from "./components/user-dashboard/dashboard";
import { useCookies } from "react-cookie";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState("hidden");
  const [cookie, , removeCookie] = useCookies(["username"]);

  function handleLogOutClick() {
    if (cookie.username !== undefined || cookie.username !== "") {
      removeCookie("username");
      setDisplay("hidden");
    }
  }
  function handleMenuClick() {
    setDisplay("flex");
  }

  document.body.addEventListener("click", (e) => {
    e.stopPropagation();
    if (
      (e.target as HTMLElement).id === "menu" ||
      (e.target as HTMLElement).id === "aside"
    ) {
      setDisplay("flex");
    } else if ((e.target as HTMLElement).id !== "aside") {
      setDisplay("hidden");
    }
  });

  return (
    <div className="text-light">
      <header className="flex p-3 justify-between">
        <div
          id="menu"
          onClick={handleMenuClick}
          className="bi bi-justify text-2xl cursor-pointer"
        ></div>
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          <span className="uppercase">Movie</span>{" "}
          <span className="text-primary uppercase">Library</span>
        </div>
        <div className="bi bi-person text-2xl cursor-pointer invisible"></div>
      </header>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
      <aside
        id="aside"
        className={`h-[100dvh] border bg-dark w-48 fixed inset-0 p-2  ${display} flex-col items-center gap-5 pt-10`}
      >
        <span id="aside" className={`font-bold text-sm`}>
          Hello, {cookie.username}
        </span>
        <button onClick={handleLogOutClick} className="btn-outline">
          Log Out
        </button>
      </aside>
    </div>
  );
}

export default App;
