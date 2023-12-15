import { useState, useEffect } from "react";
import {
  AiOutlineClose,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import styles from "./cart.module.css";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: (product.quantity || 1) - 1 };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: (product.quantity || 1) + 1 };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return total + (product.price || 0) * (product.quantity || 1);
    }, 0);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartWithDefaultQuantity = storedCart.map((product) => ({
      ...product,
      quantity: product.quantity || 1,
    }));
    setCart(cartWithDefaultQuantity);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Your Cart</h2>
      {cart.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty</p>
      ) : (
        <div className={styles.cardsCart}>
          <ul className={styles.cardCart}>
            {cart.map((product) => (
              <li key={product.id} className={styles.cartItem}>
                <div className={styles.deleteItem}>
                  <button onClick={() => removeFromCart(product.id)}>
                    <AiOutlineClose />
                  </button>
                </div>
                <div className={styles.imgCart}>
                  <img src={product.images[0]} alt={product.title} width="50" />
                </div>
                <div className={styles.textCart}>
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                </div>
                <div className={styles.quantityCart}>
                  <button onClick={() => increaseQuantity(product.id)}>
                    <AiOutlinePlusCircle />
                  </button>
                  <span className={styles.quantityScore}>
                    {product.quantity}
                  </span>
                  <button onClick={() => decreaseQuantity(product.id)}>
                    <AiOutlineMinusCircle />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.result}>
        <p className={styles.total}>Total: ${calculateTotal()}</p>
        <div className={styles.buttonResult}>
          <button className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
