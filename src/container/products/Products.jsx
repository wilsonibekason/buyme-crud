import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import Product from './product/Product';
/// creating fake data
const product = [
    {id: 1, names: 'shoes', description: 'Beautiful running shoes', images: 'https://marvel-b1-cdn.bc0a.com/f00000000114841/www.florsheim.com/shop/resources/images/index/SS22_Refresh1_CasualHighlandCanvas.jpg' },
    {id: 2, names: 'shoes', description: 'Beautiful running shoes', images: 'https://marvel-b1-cdn.bc0a.com/f00000000114841/www.florsheim.com/shop/resources/images/index/SS22_Refresh1_CasualHighlandCanvas.jpg' },
];



const Products = ({products, onAddToCart}) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
     <div className={classes.toolbar} />  
    <Grid container justifyContent='center' spacing={4}>
      {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
             <Product product={product} onAddToCart={onAddToCart}/>
          </Grid>
      ))}
    </Grid>
    </main>
  );
}

export default Products