import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getProduktById, getKategorieById } from "../services/produktServices";

const JednotlivyProd = () => {
  const { id } = useParams();
  const [produkt, setProdukt] = useState({});
  const [kategorieNazev, setKategorieNazev] = useState("");
  const [pocet, setPocet] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prod = await getProduktById(id);
        const katId = await getKategorieById(prod.kategorie_id);
        setProdukt(prod);
        setKategorieNazev(katId.nazev);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  const kosik = (id) => {
    const pocetVeStorage = localStorage.getItem(id);
    localStorage.setItem(id, +pocetVeStorage + +pocet);
    alert("Uspesne pridan produkkt do kosiku");
  };

  return (
    <>
      <Navbar />
      <main>
        <div key={produkt.id}>
          <h2>{produkt.nazev}</h2>
          <h3>{kategorieNazev}</h3>
          <p>{produkt.popis}</p>
          <p>Cena: {produkt.cena}</p>
          {produkt.obrazek && (
            <img
              src={`http://127.0.0.1:8000/${produkt.obrazek}`}
              alt={produkt.nazev}
            />
          )}
          <input
            value={pocet}
            onChange={(e) => setPocet(e.target.value)}
            type="number"
            min={1}
            name=""
            id=""
          />
          <button onClick={() => kosik(produkt.id)}>Koupit</button>
        </div>
      </main>
    </>
  );
};

export default JednotlivyProd;
