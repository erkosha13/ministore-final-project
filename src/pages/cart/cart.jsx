import styles from './cart.module.css';


function Cart() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await getProducts();
  //       setProducts(response);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.cards}>
        {products.map((product) => (
          <div key={product.id}>
            <div className={styles.cardsImg}>
              <img src={product.images[0]} alt={product.title}></img>
            </div>
            <div className={styles.info}>
              <div className={styles.text}>
                <p>{product.title}</p>
                <p>${product.price}</p>
              </div>
              <button>Add to Bag</button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Cart;
