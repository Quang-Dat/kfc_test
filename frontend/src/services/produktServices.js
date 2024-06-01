import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getProduktById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_URL}/produkty/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Chyba při aktualizaci produktu:", error.response.data);
    } else {
      console.error("Chyba při aktualizaci produktu:", error);
    }
    throw error;
  }
};
export const getKategorieById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_URL}/kategorie/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Chyba při aktualizaci produktu:", error.response.data);
    } else {
      console.error("Chyba při aktualizaci produktu:", error);
    }
    throw error;
  }
};

export const allProdukty = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_URL}/produkty`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const allKategorie = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_URL}/kategorie`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const pridat = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    console.log("Fetching categories...");

    const response = await axios.get(`${API_URL}/kategorie`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let kategorieExists = false;
    let kategorieId;

    response.data.forEach((el) => {
      if (el.nazev && el.nazev.toLowerCase() === data.kategorie.toLowerCase()) {
        kategorieExists = true;
        kategorieId = el.id;
      }
    });

    if (!kategorieExists) {
      console.log("Creating new category...");

      const newKategorieResponse = await axios.post(
        `${API_URL}/vytvorkategorii`,
        { nazev: data.kategorie },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      kategorieId = newKategorieResponse.data.id;
      console.log("New category created with ID:", kategorieId);
    } else {
      console.log("Category exists with ID:", kategorieId);
    }

    const formData = new FormData();
    formData.append("nazev", data.nazev);
    formData.append("popis", data.popis);
    formData.append("cena", data.cena);
    formData.append("obrazek", data.obr);
    formData.append("kategorie_id", kategorieId);

    console.log("Submitting new product...");

    const newProductResponse = await axios.post(
      `${API_URL}/vytvorprodukt`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("New product created:", newProductResponse.data);
    return newProductResponse.data;
  } catch (error) {
    console.error("Error fetching or creating categories:", error);
    throw error;
  }
};

export const upravit = async (productId, productData) => {
  console.log("Starting update process with productId:", productId);
  console.log("Product data to update:", productData);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Získání kategorií
    const response = await axios.get(`${API_URL}/kategorie`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let kategorieExists = false;
    let kategorieId;

    response.data.forEach((el) => {
      if (
        el.nazev &&
        el.nazev.toLowerCase() === productData.kategorie.toLowerCase()
      ) {
        kategorieExists = true;
        kategorieId = el.id;
      }
    });

    if (!kategorieExists) {
      // Kategorie neexistuje, vytvoříme novou
      const newKategorieResponse = await axios.post(
        `${API_URL}/vytvorkategorii`,
        { nazev: productData.kategorie },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      kategorieId = newKategorieResponse.data.id;
    }

    // Nastavení ID kategorie do dat produktu
    const formData = new FormData();
    formData.append("nazev", productData.nazev);
    formData.append("popis", productData.popis);
    formData.append("cena", productData.cena);
    formData.append("kategorie_id", kategorieId);
    if (productData.obr) {
      formData.append("obrazek", productData.obr);
    }

    // Logování formData pro diagnostiku
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Aktualizace produktu
    const responseUpdate = await axios.post(
      `${API_URL}/upravitprodukty/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Produkt úspěšně aktualizován:", responseUpdate.data);
    return responseUpdate.data;
  } catch (error) {
    if (error.response) {
      console.error("Chyba při aktualizaci produktu:", error.response.data);
    } else {
      console.error("Chyba při aktualizaci produktu:", error);
    }
    throw error;
  }
};

export const smazat = async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `${API_URL}/produkt/smazat/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Chyba při aktualizaci produktu:", error.response.data);
    } else {
      console.error("Chyba při aktualizaci produktu:", error);
    }
    throw error;
  }
};
export const aktivovat = async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `${API_URL}/produkt/aktivovat/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Chyba při aktualizaci produktu:", error.response.data);
    } else {
      console.error("Chyba při aktualizaci produktu:", error);
    }
    throw error;
  }
};
