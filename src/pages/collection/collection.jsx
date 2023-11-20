import { useEffect, useState } from "react";
import styles from "./collection.module.css";
import { fetchProducts } from "../../api/api";

function Collection() {
  const [uniqueCategoryProducts, setUniqueCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();

      // Выбираем по одному продукту из каждой категории
      const uniqueProductsMap = new Map();
      const allowedCategories = [
        "Fashion",
        "Electronics",
        "Furniture",
        "Shoes",
      ];

      productsData.forEach((product) => {
        const category = product.category.name;

        if (
          allowedCategories.includes(category) &&
          !uniqueProductsMap.has(category)
        ) {
          uniqueProductsMap.set(category, product);
        }
      });

      const uniqueCategoryProductsArray = Array.from(
        uniqueProductsMap.values()
      );
      setUniqueCategoryProducts(uniqueCategoryProductsArray);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Отобразите уникальные продукты из каждой категории внутри вашего компонента */}
      {uniqueCategoryProducts.map((product) => (
        <div key={product.id} className={styles.categoryItem}>
          <img src={product.category.image} alt={product.category.name} />
          <p>{product.category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Collection;
