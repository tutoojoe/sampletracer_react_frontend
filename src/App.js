import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import GLogin from "./components/GoogleAuth/GLogin";
import GLogout from "./components/GoogleAuth/GLogout";
import UserList from "./components/UserList";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import SignIn from "./Pages/SignIn";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="register/" element={<Register />} />
        <Route path="signin/" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
