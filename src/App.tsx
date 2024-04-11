import "./App.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import LoginScreen from "./components/loginscreen/loginscreen";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div>
      <LoginScreen />
    </div>
  );
}

export default App;
