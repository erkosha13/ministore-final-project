import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts, getSearch } from '../../api/api';
import { Input } from 'antd';
import styles from './catalog.module.css';
import Skeleton from './skeleton';

const { Search } = Input;

function Catalog() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = new URLSearchParams(location.search).get('category');
  const [selectedCategory, setSelectedCategory] = useState(
    categoryId ? parseInt(categoryId, 10) : 1
  );
  const [loading, setLoading] = useState(true);

  const categories = [
    'Clothes',
    'Electronics',
    'Furniture',
    'Shoes',
    'Miscellaneous',
  ];

  const onSearch = async (value) => {
    try {
      setLoading(true);
      const searchResults = await getSearch(value);
      setProducts(searchResults);
    } catch (error) {
      console.error('Ошибка при выполнении поиска:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (selectedCategory !== null && selectedCategory !== undefined) {
          const categoryIdToFetch = selectedCategory;
          setProducts(await getProducts(categoryIdToFetch));
        } else {
          const searchTerm = new URLSearchParams(location.search).get('title');
          setProducts(await getSearch(searchTerm));
        }
      } catch (error) {
        console.error('Ошибка:', error);
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
                    : ''
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
                <img src={product.images[0]} alt={product.title} />
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
