// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/admin/Admin";
import { getUser } from "./services/authServices";
import Index from "./pages/Index";
import Pridat from "./pages/admin/Pridat";
import UpravitVsechny from "./pages/admin/UpravitVsechny";
import Upravit from "./pages/admin/Upravit";
import Smazat from "./pages/admin/Smazat";
import Produkty from "./pages/Produkty";
import JednotlivyProd from "./pages/JednotlivyProd";
import Kosik from "./pages/Kosik";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/produkty" element={<Produkty />} />
        <Route path="/produkty/:id" element={<JednotlivyProd />} />
        <Route path="/kosik/" element={<Kosik />} />

        <Route
          path="/admin"
          element={<PrivateRoute user={user} component={Admin} />}
        />
        <Route
          path="/admin/pridat"
          element={<PrivateRoute user={user} component={Pridat} />}
        />
        <Route
          path="/admin/smazat"
          element={<PrivateRoute user={user} component={Smazat} />}
        />
        <Route
          path="/admin/upravit"
          element={<PrivateRoute user={user} component={UpravitVsechny} />}
        />
        <Route
          path="/admin/upravit/:id"
          element={<PrivateRoute user={user} component={Upravit} />}
        />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ user, component: Component }) => {
  return user && user.role === "admin" ? <Component /> : <Navigate to="/" />;
};

export default App;
