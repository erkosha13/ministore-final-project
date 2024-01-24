import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        { email, password }
      );

      // Сохранение токенов в локальное хранилище
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      // Переход на страницу профиля после успешной авторизации
      navigate("/profile");
    } catch (error) {
      // Обработка ошибок авторизации
      if (error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.loginInput}>
        <p>Email Adress:</p>
        <input
          type="email"
          placeholder="test@mail.kz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password:</p>
        <input
          type="password"
          placeholder="*****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.loginButton}>
        <button type="submit">Login</button>
        <button onClick={handleRegisterClick}> Create account</button>
      </div>
    </form>
  );
};

export default Login;
