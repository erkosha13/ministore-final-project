import { useState, useEffect } from "react";
import { RiHeartAddLine } from "react-icons/ri";
import styles from "../catalog/catalog.module.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Получение продуктов из localStorage (может потребоваться логика хранения)
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const addToLocalStorage = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClickRemoveFromWishlist = (product) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className={styles.wrapper}>
      <h2>Wishlist</h2>
      <div className={styles.catalog}>
        {wishlist.map((product, index) => (
          <div key={`${product.id}-${index}`} className={styles.card}>
            <img src={product.images[0]} alt={product.title} />
            <div className={styles.text}>
              <p>{product.title}</p>
              <p className={styles.price}>${product.price}</p>
            </div>
            <div className={styles.cardsbuttons}>
              <button
                onClick={() => addToLocalStorage(product)}
                className={styles.bag}
              >
                Add to Bag
              </button>
              <button
                onClick={() => handleClickRemoveFromWishlist(product)}
                className={`${styles.wishlist} ${styles.wishlistAdded}`}
              >
                <RiHeartAddLine />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
