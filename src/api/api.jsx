import axios from 'axios';

export const getCategories = async () => {
  try {
    const response = await axios.get(
      'https://api.escuelajs.co/api/v1/categories?offset=0&limit=4'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export const getProducts = async () => {
  try {
    const response = await axios.get(
      'https://api.escuelajs.co/api/v1/products'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}