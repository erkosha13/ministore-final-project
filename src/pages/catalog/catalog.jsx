import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts, getSearch } from "../../api/api";
import { Input } from "antd";
import { RiHeartAddLine } from "react-icons/ri";
import styles from "./catalog.module.css";
import Skeleton from "./skeleton";

const { Search } = Input;

function Catalog() {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(8);
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = new URLSearchParams(location.search).get("category");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryId ? parseInt(categoryId, 10) : 1
  );
  const [loading, setLoading] = useState(true);

  const categories = [
    "Clothes",
    "Electronics",
    "Furniture",
    "Shoes",
    "Miscellaneous",
  ];

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.map((product) => {
      const isInWishlist = JSON.parse(localStorage.getItem("wishlist"))?.some(
        (wishlistItem) => wishlistItem.id === product.id
      );
      return { ...product, inWishlist: isInWishlist };
    });
    setProducts(updatedProducts);
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const onSearch = async (value) => {
    try {
      setLoading(true);
      const searchResults = await getSearch(value);
      setProducts(
        searchResults.map((product) => ({ ...product, inWishlist: false }))
      );
    } catch (error) {
      console.error("Ошибка при выполнении поиска:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToLocalStorage = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClickAddToBag = (product) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    addToLocalStorage(product);
  };

  const handleClickAddToWishlist = async (product) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const isProductInWishlist = storedWishlist.some(
        (item) => item.id === product.id
      );

      let updatedWishlist;

      if (isProductInWishlist) {
        updatedWishlist = storedWishlist.filter(
          (item) => item.id !== product.id
        );
      } else {
        updatedWishlist = [...storedWishlist, product];
      }

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id === product.id
            ? { ...prevProduct, inWishlist: !prevProduct.inWishlist }
            : prevProduct
        )
      );
    } catch (error) {
      console.error("Ошибка при обновлении Wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (selectedCategory !== null && selectedCategory !== undefined) {
          const categoryIdToFetch = selectedCategory;
          const fetchedProducts = await getProducts(categoryIdToFetch);
          const updatedProducts = fetchedProducts.map((product) => {
            const isInWishlist = JSON.parse(
              localStorage.getItem("wishlist")
            )?.some((wishlistItem) => wishlistItem.id === product.id);
            return { ...product, inWishlist: isInWishlist };
          });
          setProducts(updatedProducts);
        } else {
          const searchTerm = new URLSearchParams(location.search).get("title");
          const searchResults = await getSearch(searchTerm);
          const updatedProducts = searchResults.map((product) => {
            const isInWishlist = JSON.parse(
              localStorage.getItem("wishlist")
            )?.some((wishlistItem) => wishlistItem.id === product.id);
            return { ...product, inWishlist: isInWishlist };
          });
          setProducts(updatedProducts);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, location.search]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/catalog?category=${categoryId}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <Search
          className={styles.search}
          placeholder="Поиск"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <div className={styles.sort}>
          <ul>
            {categories.map((value, i) => (
              <li
                key={i}
                onClick={() => handleCategoryClick(i + 1)}
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
            {products.slice(0, visible).map((product) => (
              <div key={product.id} className={styles.card}>
                <img src={product.images[0]} alt={product.title} />
                <div className={styles.text}>
                  <p>{product.title}</p>
                  <p className={styles.price}>${product.price}</p>
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
                    className={`${styles.wishlist} ${
                      product.inWishlist ? styles.wishlistAdded : ""
                    }`}
                  >
                    <RiHeartAddLine />
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.load}>
              <button onClick={showMoreItems}>Load more</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
