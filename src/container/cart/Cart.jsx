import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import CartItems from './cartItems/CartItems';
import useStyles from './style';



const Cart = ({cart}) => {

    const isEmpty = !cart.line_items.length;
    const classes = useStyles();
  return (
      <Container>
         <div className={classes.toolbar}>
           <Typography variant='h3' className={classes.title} gutterBottom>
            {isEmpty ? <EmptyCart/> : <FilledCart/>}
           </Typography>
         </div>
      </Container>
  )
}


const EmptyCart = () => {
    <Typography variant='subtitle1' >
        You have no item in your cart 
        <Link to='/'>
            <Typography variant='body1'
            color='GrayText' >
              Add Something
            </Typography>
        </Link>
    </Typography>
}


const FilledCart = ({cart}) => {
    <>
    <Grid container spacing={2}>
        {cart.map((item) => (
         <Grid item xs={12} sm={4} lg={3} key={item.id}>
             <CartItems item={item}/>
         </Grid>
        ))}
    </Grid>
    </>
}
 
export default Cart