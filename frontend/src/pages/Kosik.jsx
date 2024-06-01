import React, { useEffect, useState } from "react";
import { getProduktById } from "../services/produktServices";

const Kosik = () => {
  const [items, setItems] = useState({});
  const [produkty, setProdukty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllItemsExceptToken = async () => {
      const allItems = {};
      const tokenKey = "token";
      const produktyList = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key !== tokenKey) {
          const value = localStorage.getItem(key);
          allItems[key] = value;
          console.log(`Fetching product with key: ${key}`);

          try {
            const prod = await getProduktById(key);
            if (prod) {
              produktyList.push(prod);
            }
          } catch (error) {
            console.error(`Error fetching product with id ${key}:`, error);
          }
        }
      }

      setItems(allItems);
      setProdukty(produktyList);
      setLoading(false);
    };

    getAllItemsExceptToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Kosik</h1>
      <ul>
        {produkty.map((produkt) => (
          <li key={produkt.id}>
            <h2>{produkt.nazev}</h2>
            <p>{produkt.popis}</p>
            <p>Cena: {produkt.cena}</p>
            {produkt.obrazek && (
              <img
                src={`http://127.0.0.1:8000/${produkt.obrazek}`}
                alt={produkt.nazev}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Kosik;
