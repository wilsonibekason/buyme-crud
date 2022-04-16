import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import CartItems from './cartItems/CartItems';
import useStyles from './style';

const Cart = ({cart, onUpdateCart, onAddToCart, onRemoveCart, onEmptyCart }) => {
    console.log(cart.line_items);
    const Cart = cart.line_items;
    const isEmpty = !cart.line_items?.length;
    const classes = useStyles();
      
const EmptyCart = () => (
    <Typography variant='h3' >
        You have no item in your cart 
        <Link to='/'>
            <Typography variant='h6'
            color='GrayText' >
              Add Something
            </Typography>
        </Link>
    </Typography>
);
if(!cart.line_items) return 'loading .....';

const FilledCart = () => (
    <>
    <Grid container spacing={3}>
        {cart.line_items.map((item) => 
      
        (
         <Grid item xs={12} sm={4} key={item.id}>       
              <CartItems item={item} onUpdateCartQty={onUpdateCart} onAddCart={onAddToCart} onRemoveFromCart={onRemoveCart}/> 
         </Grid>
        ))}
    </Grid>
    {/*** bottom cart content */}
    <div className={classes.cardDetails}>
        <Typography variant='h5'>
        Subtotal : {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={() => onEmptyCart()} >Empty cart</Button>
          <Button className={classes.checkoutButton}  size="large" type="button" variant="contained" color="primary" component={Link} to='/checkout'>Checkout</Button>
        </div>
    </div> 
    </>
);

  return (
      <Container>
        <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
         Your shopping Cart
         </Typography>
            {!cart.line_items?.length ? EmptyCart() : <FilledCart/>}
          
      </Container>
  );
};

export default Cart;