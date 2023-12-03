import { useState } from "react";
import { Input, Button, Select, Modal } from "antd";
import useCatalogLogic from "./catalogLogic";
import styles from "./catalog.module.css";
import loadImg from "../../assets/gif/load.gif";


const { Search } = Input;

const CatalogPage = () => {
  const {
    filteredProducts,
    sortOrder,
    searchValue,
    onSearch,
    sortOptions,
    sortProducts,
    filterByCategory,
    loading,
  } = useCatalogLogic();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

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
            <div
              key={product.id}
              onClick={() => showModal(product)}
              className={styles.productCard}
            >
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
      <Modal
        title={selectedProduct ? selectedProduct.title : ""}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedProduct && (
          <div className={styles.modal}>
            <div className={styles.modalImg}>
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
              />
              <p>{`Title: ${selectedProduct.title}`}</p>
              <p>{`Price: $${selectedProduct.price}`}</p>
            </div>
            <div className={styles.modalDescription}>
              <p>{selectedProduct.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CatalogPage;