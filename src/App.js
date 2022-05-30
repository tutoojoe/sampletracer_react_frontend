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
import MerchandiserPage from "./Pages/MerchandiserPage";
import StorePage from "./Pages/StorePage";
import SuppliersPage from "./Pages/SuppliersPage";
import io from "socket.io-client";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
const socket = io("http://localhost:8000");
function App() {
  return (
    <MainNav>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<HomePage />} />
              <Route path="suppliers/" element={<SuppliersPage />} />
            </Route>
            <Route path="customers/" element={<CustomersPage />} />
            <Route path="merchandisers/" element={<MerchandiserPage />} />
            <Route path="store/" element={<StorePage />} />
          </Route>
          <Route path="register/" element={<Register />} />

          <Route path="signin/" element={<SignIn />} />

          {/* <Route path="google/" element={<GLogin />}></Route> */}
        </Routes>
      </div>
    </MainNav>
  );
}

export default App;
