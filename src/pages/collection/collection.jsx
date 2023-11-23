import { useEffect, useState } from "react";
import styles from "./collection.module.css";
import { getCategories, getProducts } from "../../api/api";
import leftImg from "../../assets/left.png";
import rightImg from "../../assets/right.png";

const Collection = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const getUniqueImages = () => {
    const uniqueImages = {};

    products.forEach((product) => {
      if (!uniqueImages[product.category.id]) {
        uniqueImages[product.category.id] = product.images[0];
      }
    });

    return Object.values(uniqueImages);
  };

  const filteredImages = selectedCategory
    ? products
        .filter((product) => product.category.id === selectedCategory)
        .map((product) => product.images[0])
    : getUniqueImages();

  const currentItems = filteredImages.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  return (
    <div className={styles.wrapper}>
      <h2>Categories</h2>
      <div className={styles.cards}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={styles.categoryItem}
            onClick={() => handleCategoryClick(category.id)}
          >
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className={styles.sliderWrapper}>
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
          >
            <img src={leftImg} alt=""></img>
          </button>
          <div className={styles.slider}>
            {currentItems.map((image, index) => (
              <div key={index} className={styles.imageItem}>
                <img src={image} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(prevPage + 1, Math.ceil(filteredImages.length / 4))
              )
            }
          >
            <img src={rightImg} alt=""></img>
          </button>
        </div>
      )}
    </div>
  );
};

export default Collection;
