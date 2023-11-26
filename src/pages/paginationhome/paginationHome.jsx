import styles from "./paginationHome.module.css";
import { useEffect, useState } from "react";
import { getCatalog } from "../../api/api";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const PaginationHome = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [startProductIndex, setStartProductIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getCatalog(100);
        setProducts(productsData);
        setVisibleProducts(
          productsData.slice(startProductIndex, startProductIndex + 4)
        );
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [startProductIndex]);

  const totalProducts = products.length;

  const handleNextSlide = () => {
    const newStartIndex = (startProductIndex + 1) % totalProducts;
    setVisibleProducts(products.slice(newStartIndex, newStartIndex + 4));
    setStartProductIndex(newStartIndex);
  };

  const handlePrevSlide = () => {
    const newStartIndex =
      (startProductIndex - 1 + totalProducts) % totalProducts;
    setVisibleProducts(products.slice(newStartIndex, newStartIndex + 4));
    setStartProductIndex(newStartIndex);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <button onClick={handlePrevSlide}>
          <BsChevronCompactLeft />
        </button>
        {visibleProducts.map((product) => (
          <div key={product.id}>
            <img src={product.images[0]} alt={product.title} />
            <div className={styles.text}>
              <p>{product.title}</p>
              <p>Price ${product.price}</p>
            </div>
          </div>
        ))}
        <button onClick={handleNextSlide}>
          <BsChevronCompactRight />
        </button>
      </div>
    </div>
  );
};

export default PaginationHome;
