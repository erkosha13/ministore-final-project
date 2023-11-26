import React from "react";
import { Input, Button, Select } from "antd";
import useCatalogLogic from "./CatalogLogic";
import styles from "./catalog.module.css";
import loadImg from "../../assets/load.gif";

const { Search } = Input;

const CatalogPage = () => {
  const {
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
    loading, // Добавляем loading из хука
  } = useCatalogLogic();

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <div className={styles.title}>
          <h1>Filter</h1>
        </div>
        <Search
          placeholder="Search"
          onSearch={onSearch}
          onChange={(e) => onSearch(e.target.value)}
          value={searchValue}
          style={{
            width: 200,
          }}
        />
        <Select
          defaultValue={sortOptions[0].value}
          style={{ width: 170 }}
          onChange={(value) => {
            if (value === "all") {
              filterByCategory(null);
            } else {
              filterByCategory(value);
            }
          }}
        >
          {sortOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
        <Button onClick={() => sortProducts("price")}>
          {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
      </div>
      <div className={styles.card}>
        {loading ? (
            <img src={loadImg} alt="loading..." />
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id}>
              <img src={product.images[0]} alt={product.title} />
              <div className={styles.text}>
                <p>{product.title}</p>
                <p>Price ${product.price}</p>
                <p>Category: {product.category.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
