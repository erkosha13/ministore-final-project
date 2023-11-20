import axios from 'axios';

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export { fetchProducts };