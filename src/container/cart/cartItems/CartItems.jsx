import React from 'react';
import { Typography, CardActions, CardContent, CardMedia, Card, Button } from '@mui/material';

import useStyles from './style';

const CartItems = ({item, onUpdateCart, onAddCart, onRemoveCart}) => {
    const classes = useStyles();

  return (
      <Card>
   <CardMedia image={item.image.url} alt={item.name} classes={classes.media} />
     
     <CardContent className={classes.cardContent}>
     <Typography variant='h4'>
         {item.name}
     </Typography> 
     <Typography variant='h5'>
         {item.line_total.formatted_with_symbol}
     </Typography>
     </CardContent>
         <CardActions className={classes.cartActions}>
             <div className={classes.buttons}>
                 <Button type='button' size='small' onClick={() => onAddCart(item.id, item.quantity + 1)}>   +   </Button>
                 <Typography>{item.quantity}</Typography>
                 <Button type='button' size='small' onClick={() => onUpdateCart(item.id, item.quantity - 1)}> - </Button>
             </div>
             <Button type='button' variant='contained' color='secondary'
             onClick={() => onRemoveCart} > Remove </Button>
         </CardActions>
   </Card>
  )
}

export default CartItems