import { useEffect, useState } from "react";
import styles from "./collection.module.css";
import { getCategories } from "../../api/api";

const Collection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategories(await getCategories());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Categories</h2>
      <div className={styles.cards}>
        {categories.map(({ id, image, name }) => (
          <div key={id} className={styles.categoryItem}>
            <img src={image} alt={name} />
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
