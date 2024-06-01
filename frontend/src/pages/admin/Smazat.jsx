import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  aktivovat,
  allProdukty,
  smazat,
  smazat as smazatProdukt,
} from "../../services/produktServices";

const Smazat = () => {
  const [produkty, setProdukty] = useState([]);
  const [smazatProd, setSmazatProd] = useState(1);

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
  }, [smazatProd]);

  const mazat = async (id) => {
    if (!window.confirm("Opravdu chcete tento produkt smazat?")) {
      console.log("Delete canceled by the user.");
      return;
    }

    try {
      await smazat(id);
      // Aktualizace seznamu produktů po smazání
      setProdukty((prevProdukty) =>
        prevProdukty.filter((produkt) => produkt.id !== id)
      );
    } catch (error) {
      if (error.response) {
        console.error("Chyba při smazání produktu:", error.response.data);
      } else {
        console.error("Chyba při smazání produktu:", error);
      }
    }
  };

  const aktivovatProd = async (id) => {
    if (!window.confirm("Opravdu chcete tento produkt smazat?")) {
      console.log("Delete canceled by the user.");
      return;
    }

    try {
      await aktivovat(id);
      // Aktualizace seznamu produktů po smazání
      setProdukty((prevProdukty) =>
        prevProdukty.filter((produkt) => produkt.id !== id)
      );
    } catch (error) {
      if (error.response) {
        console.error("Chyba při smazání produktu:", error.response.data);
      } else {
        console.error("Chyba při smazání produktu:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div>
          <button onClick={() => setSmazatProd(1)}>Zobrazit Aktivní</button>
          <button onClick={() => setSmazatProd(0)}>Zobrazit Neaktivní</button>
        </div>

        {produkty
          .filter((produkt) => produkt.aktivni === smazatProd)
          .map((produkt) => (
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
              {smazatProd === 1 ? (
                <button onClick={() => mazat(produkt.id)}>Smazat</button>
              ) : (
                <button
                  onClick={() => {
                    aktivovatProd(produkt.id);
                  }}
                >
                  Aktivovat
                </button>
              )}
            </div>
          ))}
      </main>
    </>
  );
};

export default Smazat;
