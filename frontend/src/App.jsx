import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Account from './pages/MyAccount'
import AddProducts from './pages/Add_Products.jsx';
import './App.css';

import {useState,useEffect} from "react";

function App() {
  const [user,setUser] = useState(null)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);  
  }, []);
 
  return (
    <div>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          {user ? (
              <>
                <Link to="/account">My Account</Link>
                {user.role === 1 && <Link to="/add-product">Add Products</Link>}
              </>
            ) : (
              <Link to="/auth">Login / Sign Up</Link>
            )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path = "/account" element={<Account/>}/>
          <Route path = "/add-product" element = {<AddProducts/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
