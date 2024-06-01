import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { allKategorie, pridat } from "../../services/produktServices";

const Pridat = () => {
  const [nazev, setNazev] = useState("");
  const [popis, setPopis] = useState("");
  const [cena, setCena] = useState("");
  const [kategorie, setKategorie] = useState("");
  const [obr, setObr] = useState(null);
  const [obrUrl, setObrUrl] = useState("");
  const [kat, setKat] = useState([]);

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
    const productData = { nazev, popis, cena, kategorie, obr };
    try {
      await pridat(productData);
    } catch (error) {
      console.error(error);
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
            <textarea
              className="resize-none"
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
            <input type="file" onChange={handleImageChange} required />
            {obrUrl && <img src={obrUrl} alt="Selected" />}
          </div>
          <button type="submit">Přidat</button>
        </form>
      </main>
    </>
  );
};

export default Pridat;
