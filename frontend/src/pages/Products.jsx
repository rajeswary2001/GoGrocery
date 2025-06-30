import React, {useState, useEffect} from "react";
import axios from "axios";
import "../styles/Products.css";

function Products(){
    const [products, setProducts]= useState([])
    const [cart,setCart] = useState(() => {
      return JSON.parse(localStorage.getItem("cart")) || [];
     }); // if local storage contains some products in the cart, they will be set to this cart variable else just an empty array
    
    useEffect(()=>{
        axios.get("http://localhost:5167/products/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Saving cart to localStorage:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
    
  const handleCart=(product)=>{
    if (isInCart(product._id)){
      setCart(prev => prev.filter(item=> item._id !== product._id ))  // if item is in cart, which means we are removing item . filter helps to filter all the elements with id not equal to given product and update cart
    }else{
      setCart(prev => [...prev, { ...product, quantity: 1 }]); // if item not in cart, we have to add item, including previous data , add new data also
    }
  }
  const isInCart =(id)=>{
      return cart.some(item => item._id === id)
  }
   
  return (
    <div className="products-page">
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={`http://localhost:5167/uploads/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Cost per lb: ${product.costPerLb}</p>
            <button onClick={()=>handleCart(product)}>{isInCart(product._id)?"Remove from cart": "Add to cart"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Products