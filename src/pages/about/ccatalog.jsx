import { useState, useEffect } from "react";
import { getProducts } from "../../api/api";
import { Input, Image } from "antd";
import styles from "./ccatalog.module.css";
import Skeleton from "./skeleton";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

function About() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Products = async () => {
      try {
        setProducts(await getProducts());
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    Products();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <div className={styles.sort}>
          <p>All</p>
          <p>Сlothes</p>
          <p>Electronics</p>
          <p>Furniture</p>
          <p>Shoes</p>
          <p>Miscellaneous</p>
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
                <Image src={product.images[0]} />
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

export default About;
