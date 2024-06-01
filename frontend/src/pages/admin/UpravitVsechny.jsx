import React, { useState, useEffect } from "react";
import { allProdukty } from "../../services/produktServices";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const UpravitVsechny = () => {
  const [produkty, setProdukty] = useState([]);

  useEffect(() => {
    const fetchProdukty = async () => {
      try {
        const prod = await allProdukty();
        setProdukty(prod);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProdukty();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <main>
        {produkty.map((produkt) => (
          <div key={produkt.id}>
            <h2>{produkt.nazev}</h2>
            <p>{produkt.popis}</p>
            <p>Cena: {produkt.cena}</p>
            {produkt.obrazek && (
              <img
                src={`http://127.0.0.1:8000/${produkt.obrazek}`}
                alt={produkt.nazev}
              />
            )}
            <Link to={`/admin/upravit/${produkt.id}`}>Upravit</Link>
          </div>
        ))}
      </main>
    </>
  );
};

export default UpravitVsechny;
