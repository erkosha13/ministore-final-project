import { useEffect, useState } from "react";
import { getProducts } from "../../api/api";

const useCatalogLogic = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts(100);
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSearch = (value, _e, info) => {
    setSearchValue(value);

    let filteredBySearch = products;

    if (value.trim() !== "") {
      filteredBySearch = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
    }

    if (selectedCategory) {
      const filteredByCategory = filteredBySearch.filter(
        (product) => product.category.name === selectedCategory
      );
      setFilteredProducts(filteredByCategory);
    } else {
      setFilteredProducts(filteredBySearch);
    }
  };

  const sortOptions = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "Clothes",
      label: "Clothes",
    },
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Furniture",
      label: "Furniture",
    },
    {
      value: "Shoes",
      label: "Shoes",
    },
  ];
  const sortProducts = (method) => {
    let sortedProducts = [...filteredProducts];
    let newSortOrder = "asc";

    if (method === sortBy) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }

    if (method === "price" || method === "priceDesc") {
      sortedProducts.sort((a, b) => {
        const order = newSortOrder === "asc" ? 1 : -1;
        return order * (a.price - b.price);
      });
    } else if (method === "category") {
      // Добавляем логику для сортировки по категории
      sortedProducts.sort((a, b) => {
        const order = newSortOrder === "asc" ? 1 : -1;
        return order * a.category.name.localeCompare(b.category.name);
      });
    }

    setFilteredProducts(sortedProducts);
    setSortBy(method);
    setSortOrder(newSortOrder);
  };

  const filterByCategory = (category) => {
    if (category === null || selectedCategory === category) {
      setSelectedCategory(category);
      setFilteredProducts(products);
    } else {
      const filteredByCategory = products.filter((product) => product.category.name === category);
      setFilteredProducts(filteredByCategory);
      setSelectedCategory(category);
    }
  };

  return {
    products,
    filteredProducts,
    sortBy,
    sortOrder,
    selectedCategory,
    searchValue,
    onSearch,
    sortOptions,
    sortProducts,
    filterByCategory,
    loading,
  };
};

export default useCatalogLogic;