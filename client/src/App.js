import { Route, Link, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={LandingPage} />
        <Route exact path="/login" element={LoginPage} />
        <Route exact path="/register" element={RegisterPage}></Route>
      </Routes>
    </div>
  );
}

export default App;
