import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/categories?offset=0&limit=5"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getProducts = async (categoryId) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getPagination = async (offset) => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=5`
    );
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const getSearch = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?title=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка', error);
    throw error;
  }
};
