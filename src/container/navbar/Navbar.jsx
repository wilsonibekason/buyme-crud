import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material'
import { ShoppingCartSharp } from '@mui/icons-material'
import  makeStyles from './style';
import image from '../../constants/image';


const Navbar = ({totalItems}) => {
    const classes = makeStyles();
  return (
    <>
    <AppBar position='fixed' color= 'inherit' className={classes.AppBar}>
    <Toolbar>
        <Typography className={classes.title} color='inherit'>
            <img src={image.logo} alt='commercejs' height='25px' className={classes.images} />
        </Typography>
        <div className={classes.grow} />
        <IconButton  aria-label='show cart items' color='inherit' />
        <Badge badgeContent={totalItems} color='secondary'>
        <ShoppingCartSharp/>
        </Badge>
       
    </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar