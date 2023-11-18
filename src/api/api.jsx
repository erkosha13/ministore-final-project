import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./api.module.css";

function Api() {
  const [menClothing, setMenClothing] = useState([]);
  const [womenClothing, setWomenClothing] = useState([]);
  const [jewelery, setJewelery] = useState([]);
  const [electronicsClothing, setElectronicsClothing] = useState([]);

  const [menVisibleIndexes, setMenVisibleIndexes] = useState([0, 1, 2, 3]);
  const [womenVisibleIndexes, setWomenVisibleIndexes] = useState([0, 1, 2, 3]);
  const [jeweleryVisibleIndexes, setJeweleryVisibleIndexes] = useState([
    0, 1, 2, 3,
  ]);
  const [electronicsVisibleIndexes, setElectronicsVisibleIndexes] = useState([
    0, 1, 2, 3,
  ]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=20")
      .then((response) => {
        const allProducts = response.data;

        setMenClothing(
          allProducts.filter((product) => product.category === "men's clothing")
        );

        setWomenClothing(
          allProducts.filter(
            (product) => product.category === "women's clothing"
          )
        );

        setJewelery(
          allProducts.filter((product) => product.category === "jewelery")
        );

        setElectronicsClothing(
          allProducts.filter((product) => product.category === "electronics")
        );
      })
      .catch((error) => {
        console.error("Ошибка API:", error);
      });
  }, []);

  const handleNext = (category) => {
    switch (category) {
      case "men":
        setMenVisibleIndexes((prevIndexes) =>
          getNextIndexes(prevIndexes, menClothing)
        );
        break;
      case "women":
        setWomenVisibleIndexes((prevIndexes) =>
          getNextIndexes(prevIndexes, womenClothing)
        );
        break;
      case "jewelery":
        setJeweleryVisibleIndexes((prevIndexes) =>
          getNextIndexes(prevIndexes, jewelery)
        );
        break;
      case "electronics":
        setElectronicsVisibleIndexes((prevIndexes) =>
          getNextIndexes(prevIndexes, electronicsClothing)
        );
        break;
      default:
        break;
    }
  };

  const handlePrev = (category) => {
    switch (category) {
      case "men":
        setMenVisibleIndexes((prevIndexes) =>
          getPrevIndexes(prevIndexes, menClothing)
        );
        break;
      case "women":
        setWomenVisibleIndexes((prevIndexes) =>
          getPrevIndexes(prevIndexes, womenClothing)
        );
        break;
      case "jewelery":
        setJeweleryVisibleIndexes((prevIndexes) =>
          getPrevIndexes(prevIndexes, jewelery)
        );
        break;
      case "electronics":
        setElectronicsVisibleIndexes((prevIndexes) =>
          getPrevIndexes(prevIndexes, electronicsClothing)
        );
        break;
      default:
        break;
    }
  };

  const getNextIndexes = (prevIndexes, data) => {
    const nextIndexes = [...prevIndexes];
    nextIndexes.shift();
    const lastVisibleIndex = prevIndexes[prevIndexes.length - 1];
    nextIndexes.push((lastVisibleIndex + 1) % data.length);
    return nextIndexes;
  };

  const getPrevIndexes = (prevIndexes, data) => {
    const nextIndexes = [...prevIndexes];
    const firstVisibleIndex = prevIndexes[0];
    nextIndexes.unshift((firstVisibleIndex - 1 + data.length) % data.length);
    nextIndexes.pop();
    return nextIndexes;
  };

  return (
    <div>
      <div className={styles.title}>SHOP THE COLLECTION</div>

      <div className={styles.cards}>
        <div className={styles.subtitle}>Men Clothing</div>
        <div className={styles.apiContainer}>
          <button onClick={() => handlePrev("men")}>&lt;</button>
          <div className={styles.card}>
            {menVisibleIndexes.map((index) => (
              <div
                key={menClothing[index]?.id}
                className={styles.productContainer}
              >
                <img
                  src={menClothing[index]?.image}
                  alt={menClothing[index]?.title}
                  className={styles.productImage}
                />
              </div>
            ))}
          </div>
          <button onClick={() => handleNext("men")}>&gt;</button>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.subtitle}>Women Clothing</div>
        <div className={styles.apiContainer}>
          <button onClick={() => handlePrev("women")}>&lt;</button>
          <div className={styles.card}>
            {womenVisibleIndexes.map((index) => (
              <div
                key={womenClothing[index]?.id}
                className={styles.productContainer}
              >
                <img
                  src={womenClothing[index]?.image}
                  alt={womenClothing[index]?.title}
                  className={styles.productImage}
                />
              </div>
            ))}
          </div>
          <button onClick={() => handleNext("women")}>&gt;</button>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.subtitle}>Jewelery</div>
        <div className={styles.apiContainer}>
          <button onClick={() => handlePrev("jewelery")}>&lt;</button>
          <div className={styles.card}>
            {jeweleryVisibleIndexes.map((index) => (
              <div
                key={jewelery[index]?.id}
                className={styles.productContainer}
              >
                <img
                  src={jewelery[index]?.image}
                  alt={jewelery[index]?.title}
                  className={styles.productImage}
                />
              </div>
            ))}
          </div>
          <button onClick={() => handleNext("jewelery")}>&gt;</button>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.subtitle}>Electronics</div>
        <div className={styles.apiContainer}>
          <button onClick={() => handlePrev("electronics")}>&lt;</button>
          <div className={styles.card}>
            {electronicsVisibleIndexes.map((index) => (
              <div
                key={electronicsClothing[index]?.id}
                className={styles.productContainer}
              >
                <img
                  src={electronicsClothing[index]?.image}
                  alt={electronicsClothing[index]?.title}
                  className={styles.productImage}
                />
              </div>
            ))}
          </div>
          <button onClick={() => handleNext("electronics")}>&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default Api;
