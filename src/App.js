import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoPage from "./pages/TodoPage";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try{
      const storedToken = sessionStorage.getItem("token");
      if(storedToken){
        const response = await api.get("/user/me")
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRoute user={user}>
            <TodoPage setUser={setUser} />
          </PrivateRoute>
        } />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
