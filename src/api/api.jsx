import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./api.module.css";

function Api() {
  const [menClothing, setMenClothing] = useState([]);
  const [womenClothing, setWomenClothing] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=20")
      .then((response) => {
        const allProducts = response.data;

        const menClothingProducts = allProducts
          .filter((product) => product.category === "men's clothing")
          .slice(0, 4);
        const womenClothingProducts = allProducts
          .filter((product) => product.category === "women's clothing")
          .slice(0, 4);

        setMenClothing(menClothingProducts);
        setWomenClothing(womenClothingProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className={styles.title}>SHOP THE COLLECTION</div>
      <div className={styles.cards}>
        <div className={styles.subtitle}>Men Clothing</div>
        <div className={styles.apiContainer}>
          {menClothing.map((product) => (
            <div key={product.id} className={styles.productContainer}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.subtitle}>Women Clothing</div>
        <div className={styles.apiContainer}>
          {womenClothing.map((product) => (
            <div key={product.id} className={styles.productContainer}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Api;