import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./profile.module.css";

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      axios
        .get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => setUser(response.data))
        .catch((error) => console.error(error));
    }
  }, []);

  const handleLogout = () => {
    // Удаление токена доступа из локального хранилища
    localStorage.removeItem("access_token");

    // Перенаправление пользователя на главную страницу
    window.location.href = "/login";
  };

  return (
    <div className={styles.wrapper}>
      {user ? (
        <div className={styles.data}>
          <h2>User profile</h2>
          <img src={user.avatar} />
          <div className={styles.dataText}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role : {user.role}</p>
          </div>
          <button onClick={handleLogout}>Exit</button>
        </div>
      ) : (
        <p>Необходимо авторизоваться</p>
      )}
    </div>
  );
};

export default Profile;
