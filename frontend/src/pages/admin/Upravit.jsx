import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProduktById,
  upravit,
  allKategorie,
  getKategorieById,
} from "../../services/produktServices";
import Navbar from "../../components/Navbar";

const Upravit = () => {
  const { id } = useParams();
  const [produkt, setProdukt] = useState({});
  const [nazev, setNazev] = useState("");
  const [popis, setPopis] = useState("");
  const [cena, setCena] = useState("");
  const [kategorie, setKategorie] = useState("");
  const [obr, setObr] = useState(null);
  const [obrUrl, setObrUrl] = useState("");
  const [kat, setKat] = useState([]);

  useEffect(() => {
    const fetchProdukt = async () => {
      try {
        const prod = await getProduktById(id);
        setProdukt(prod);
        setNazev(prod.nazev);
        setPopis(prod.popis);
        setCena(prod.cena);
        const kategorieById = await getKategorieById(prod.kategorie_id);
        setKategorie(kategorieById.nazev);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProdukt();
  }, [id]);

  useEffect(() => {
    const fetchKategorie = async () => {
      try {
        const kategorieData = await allKategorie();
        setKat(kategorieData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKategorie();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logování pro diagnostiku
    console.log("Form was submitted!");

    const productData = { nazev, popis, cena, kategorie, obr };

    // Log product data for debugging
    console.log("Product Data:", productData);

    try {
      await upravit(id, productData);
      // Handle success (e.g., show a message or redirect)
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Logování validačních chyb ze serveru
        console.error("Validation errors:", error.response.data);
      } else {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setObr(file);
      setObrUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Název</label>
            <input
              type="text"
              value={nazev}
              onChange={(e) => setNazev(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Popis</label>
            <input
              type="text"
              value={popis}
              onChange={(e) => setPopis(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Cena</label>
            <input
              type="number"
              value={cena}
              onChange={(e) => setCena(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Kategorie</label>
            <input
              type="text"
              value={kategorie}
              onChange={(e) => setKategorie(e.target.value)}
              required
              list="kat"
            />
            <datalist id="kat">
              {kat.map((el, i) => (
                <option key={i} value={el.nazev} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Obrázek</label>
            <input type="file" onChange={handleImageChange} />
            {obrUrl && <img src={obrUrl} alt="Selected" />}
          </div>
          <button type="submit">Upravit</button>
        </form>
      </main>
    </>
  );
};

export default Upravit;
