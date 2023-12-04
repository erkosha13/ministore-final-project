import { useEffect, useState } from "react";
import { getCatalog } from "../../../api/api";

const usePaginationHome = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [startProductIndex, setStartProductIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getCatalog(100);
        setProducts(productsData);
        setVisibleProducts(getVisibleProducts(startProductIndex, productsData));
      } catch (error) {
        console.error("Error:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startProductIndex]);

  const totalProducts = products.length;

  const getCardsPerRow = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 580) {
      return 1;
    } else if (screenWidth < 768) {
      return 2;
    } else if (screenWidth < 1024) {
      return 3;
    } else {
      return 5;
    }
  };

  const getVisibleProducts = (startIndex, data) => {
    const endIndex = startIndex + getCardsPerRow();
    if (endIndex >= data.length) {
      return [
        ...data.slice(startIndex),
        ...data.slice(0, endIndex - data.length),
      ];
    }
    return data.slice(startIndex, endIndex);
  };

  const handleNextSlide = () => {
    const newStartIndex = (startProductIndex + 1) % totalProducts;
    setVisibleProducts(getVisibleProducts(newStartIndex, products));
    setStartProductIndex(newStartIndex);
  };

  const handlePrevSlide = () => {
    const newStartIndex =
      (startProductIndex - 1 + totalProducts) % totalProducts;
    setVisibleProducts(getVisibleProducts(newStartIndex, products));
    setStartProductIndex(newStartIndex);
  };

  return {
    visibleProducts,
    handleNextSlide,
    handlePrevSlide,
    loading,
  };
};

export default usePaginationHome;
