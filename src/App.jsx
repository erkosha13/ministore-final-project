import Header from "./components/header/header";
import Home from "./pages/home/home";
import HomeAbout from "./pages/text/homeabout";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Home />
      <HomeAbout />
    </Router>
  );
}

export default App;
