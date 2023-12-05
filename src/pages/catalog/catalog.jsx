import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../../api/api";
import { Input } from "antd";
import styles from "./catalog.module.css";
import Skeleton from "./skeleton";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

function Catalog() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = new URLSearchParams(location.search).get("category");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryId ? parseInt(categoryId, 10) : 1
  );
  const [loading, setLoading] = useState(true);

  const categories = [
    "Сlothes",
    "Electronics",
    "Furniture",
    "Shoes",
    "Miscellaneous",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryIdToFetch = selectedCategory || 1;
        setProducts(await getProducts(categoryIdToFetch));
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    navigate(`/catalog?category=${selectedCategory}`);
  }, [selectedCategory, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <Search
          className={styles.search}
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <div className={styles.sort}>
          <ul>
            {categories.map((value, i) => (
              <li
                key={i}
                onClick={() => setSelectedCategory(i + 1)}
                className={
                  i + 1 === selectedCategory || (i === 0 && !selectedCategory)
                    ? styles.selectedCategory
                    : ""
                }
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.catalog}>
        {loading ? (
          [...new Array(8)].map((_, index) => (
            <Skeleton key={index} className={styles.card} />
          ))
        ) : (
          <div className={styles.cards}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <img src={product.images[0]} />
                <div className={styles.text}>
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
