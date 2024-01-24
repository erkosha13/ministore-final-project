import { useState } from "react";
import axios from "axios";
import styles from "./register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        {
          name,
          email,
          password,
          avatar,
        }
      );

      console.log("Server Response:", response.data);

      // Сохранение токенов в локальное хранилище
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      // Переход на страницу профиля после успешной регистрации
      window.location.href = "/login";
    } catch (error) {
      if (error.response.status === 400) {
        setError("Fill in the input fields");
      } else {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {error && <div className={styles.error}>{error}</div>}
      <h1>Registration</h1>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="link to avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <button type="submit"> Create account </button>
      </form>
    </div>
  );
};

export default Register;
