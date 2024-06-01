import React, { useEffect, useState } from "react";
import { allKategorie, allProdukty } from "../services/produktServices";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Produkty = () => {
  const [produkty, setProdukty] = useState([]);
  const [kategorie, setKategorie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produktyData = await allProdukty();
        const kategorieData = await allKategorie();
        setProdukty(produktyData);
        setKategorie(kategorieData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {kategorie.map((kat) => (
          <div key={kat.id}>
            {produkty.some((produkt) => produkt.kategorie_id === kat.id) && (
              <>
                <h2>{kat.nazev}</h2>
                <div>
                  {produkty
                    .filter((produkt) => produkt.kategorie_id === kat.id)
                    .map((produkt) => (
                      <div key={produkt.id}>
                        <h3>{produkt.nazev}</h3>
                        <p>{produkt.popis}</p>
                        <p>Cena: {produkt.cena}</p>
                        {produkt.obrazek && (
                          <img
                            src={`http://127.0.0.1:8000/${produkt.obrazek}`}
                            alt={produkt.nazev}
                          />
                        )}
                        <Link to={`/produkty/${produkt.id}`}>Koupit</Link>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
      </main>
    </>
  );
};

export default Produkty;
