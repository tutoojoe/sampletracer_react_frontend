
import './App.css';
import GLogin from './components/GoogleAuth/GLogin';
import GLogout from './components/GoogleAuth/GLogout';
import UserList from './components/UserList';
import Register from './Pages/Register';



function App() {
  return (
    <div className="App">
     {/* <h2> Sample Tracer </h2> */}
     <Register/>
     {/* <GLogin />
     <GLogout /> */}
     {/* <UserList /> */}
    </div>
  );
}

export default App;
