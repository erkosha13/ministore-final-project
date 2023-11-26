import usePaginationHome from "./paginationLogic";
import styles from "./paginationHome.module.css";
import { AiOutlineLeftCircle,AiOutlineRightCircle  } from "react-icons/ai";

const PaginationHome = () => {
  const {
    visibleProducts,
    handleNextSlide,
    handlePrevSlide,
  } = usePaginationHome();

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.titleText}>
          <h1>All Collection</h1>
          <div className={styles.buttons}>
            <button onClick={handlePrevSlide}>
              <AiOutlineLeftCircle  />
            </button>
            <button onClick={handleNextSlide}>
              <AiOutlineRightCircle />
            </button>
          </div>
        </div>
        <div className={styles.card}>
          {visibleProducts.map((product) => (
            <div key={product.id}>
              <img src={product.images[0]} alt={product.title} />
              <div className={styles.text}>
                <p>{product.title}</p>
                <p>Price ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationHome;