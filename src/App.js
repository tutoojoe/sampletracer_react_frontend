import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import GLogin from "./components/GoogleAuth/GLogin";
import GLogout from "./components/GoogleAuth/GLogout";
import UserList from "./components/UserList";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import SignIn from "./Pages/SignIn";
import CustomersPage from "./Pages/CustomersPage";
import MainNav from "./components/MainNav";

function App() {
  return (
    <MainNav>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register/" element={<Register />} />
          <Route path="signin/" element={<SignIn />} />
          <Route path="customers/" element={<CustomersPage />} />
          <Route path="google/" element={<GLogin />}></Route>
        </Routes>
      </div>
    </MainNav>
  );
}

export default App;
