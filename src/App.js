import { useEffect, useState } from 'react';
import './App.css';
import { Cart, Navbar, Products } from './container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

 const handleUpdateCart = async( productId, quantity) => {
       const {cart} = await commerce.cart.update(productId, quantity);
       setCart(cart);
 };

 const handleRemoveFromCart = async(productId)=> {
   const {cart} = await commerce.cart.remove(productId);
   setCart(cart);
 };

 const handleEmptyCart = async() => {
   const { cart } = await commerce.cart.empty();
   setCart(cart);
 }


      
  useEffect(() => {
     fetchProducts();
     fetchCart();
    }, []);
  return (
    <Router>
      <div>
     <Navbar totalItems={cart.total_items}/>
     <Routes>
     <Route path='/' element={ <Products products={products} onAddToCart={handleAddToCart}/>} />
       <Route path='/cart' element={ <Cart cart={cart} onUpdateCart={handleUpdateCart} onRemoveCart={handleRemoveFromCart} onAddToCart={handleAddToCart} onEmptyCart={handleEmptyCart}/>} />
     </Routes>
    </div>
    </Router>
    
  );
}

export default App;
 