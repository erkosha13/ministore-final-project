import Header from "./components/header/header";
import Footer from './components/footer/footer';
import Home from "./pages/home/home";
import Catalog from './pages/catalog/catalog';
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
      <Router>
        <Header />
        <Home />
        <Footer />
      </Router>
  );
}

export default App;
