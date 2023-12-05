import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./homecatalog.module.css";
import { getCategories } from "../../../api/api";
import SkeletonCatalog from "./skeletoncatalog";

const HomeCatalog = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategories(await getCategories());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Catalog</h2>
      <div className={styles.cards}>
        {loading ? (
          [...new Array(5)].map((_, index) => (
            <SkeletonCatalog key={index}  />
          ))
        ) : (
          <div className={styles.cards}>
            {categories.map(({ id, image, name }) => (
                <Link key={id} to={`/catalog?category=${id}`} className={styles.categoryItem}>
                <img src={image} alt={name} />
                <p>{name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCatalog;
