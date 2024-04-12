import "./App.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import LoginScreen from "./components/loginscreen/loginscreen";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/loginform/loginform";
import SignUpForm from "./components/signupform/signupform";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
