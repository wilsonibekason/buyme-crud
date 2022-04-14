import { useEffect, useState } from 'react';
import './App.css';
import { Cart, Navbar, Products } from './container';
import {commerce } from './lib/commerce'

function App() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]) ;
  const [order, setOrder] = useState({});
  
 const fetchProducts  =  async() => {
  const {data} = await commerce.products.list();

  setProducts(data);
 };
  
 const fetchCart = async ()=> {
   setCart(await commerce.cart.retrieve());
 };

 // add to cart functionality
 const handleAddToCart = async(productId, quantity) => {
   const item = await commerce.cart.add(productId, quantity);
   setCart(item.cart);
 };
     
  useEffect(() => {
     fetchProducts();
     fetchCart();
    }, []);

    console.log(cart);
  

  return (
    <div>
     <Navbar totalItems={cart.total_items}/>
     <Products products={products} onAddToCart={handleAddToCart}/>
     <Cart cart={cart}/>
    </div>
  );
}

export default App;
