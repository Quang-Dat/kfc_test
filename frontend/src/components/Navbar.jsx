import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/authServices";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <header>
      <nav className="flex justify-around items-center">
        <img src="" alt="LOGO" />
        <div className="flec flex-col items-center">
          <div className={user && user.role === "admin" ? "block" : "hidden"}>
            <Link to={"/admin/pridat"}>Přidat</Link>
            <Link to={"/admin/upravit"}>Upravit</Link>
            <Link to={"/admin/smazat"}>Smazat</Link>
          </div>
          <div>
            <Link to={"/produkty"}>Produkty</Link>
            <Link>Košík</Link>
            <Link>Profil</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
