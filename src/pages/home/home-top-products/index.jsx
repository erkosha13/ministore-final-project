import { useEffect, useState } from "react";
import { getPagination } from "../../../api/api";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleText}>
        <h1>Top Products</h1>
        <div className={styles.buttons}>
          <button onClick={handlePrevPage}>
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

export default TopProduct;
