import { useEffect, useState } from "react";
import { getPagination } from "../../../api/api";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { RiHeartAddLine } from "react-icons/ri";
import styles from "./topproducts.module.css";
import SkeletonPagination from "./skeletonspaginationhome";

function TopProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getPagination(currentPage);
        setProducts(response);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const addToLocalStorage = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClickAddToBag = (product) => {
    console.log(`Product id : ${product.id}`);
    addToLocalStorage(product);
  };

  const handleClickAddToWishlist = (product) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = [...storedWishlist, product];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleText}>
        <h1>Top Products</h1>
        <div className={styles.buttons}>
          <button
            onClick={handlePrevPage}
            className={currentPage === 1 ? styles.inactiveButton : ""}
          >
            <AiOutlineLeftCircle />
          </button>
          <button onClick={handleNextPage}>
            <AiOutlineRightCircle />
          </button>
        </div>
      </div>
      <div className={styles.cards}>
        {loading ? (
          [...new Array(5)].map((_, index) => (
            <SkeletonPagination key={index} className={styles.card} />
          ))
        ) : (
          <div className={styles.cards}>
            {products.map((product) => (
              <div key={product.id}>
                <div className={styles.cardsImg}>
                  <img src={product.images[0]} alt={product.title}></img>
                </div>
                <div className={styles.info}>
                  <div className={styles.text}>
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                  </div>
                  <div className={styles.cardsbuttons}>
                    <button
                      onClick={() => handleClickAddToBag(product)}
                      className={styles.bag}
                    >
                      Add to Bag
                    </button>
                    <button
                      onClick={() => handleClickAddToWishlist(product)}
                      className={styles.wishlist}
                    >
                      <RiHeartAddLine />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TopProduct;
