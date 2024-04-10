import "./App.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import LoginScreen from "./components/loginscreen/loginscreen";
import Dashboard from "./components/user-dashboard/dashboard";

function App() {
  return (
    <div>
      <LoginScreen />
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
