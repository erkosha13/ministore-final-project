import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import Catalog from "./pages/catalog/catalog";
import Wishlist from "./pages/wishlist/wishlist";
import About from "./pages/about/about";
import Contacts from "./pages/contacts/contacts";
import Login from "./pages/login/login";
import NotFound from "./components/notfound";
import Cart from './pages/cart/cart';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about/" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/:productId" element={<Contacts />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
