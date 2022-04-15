import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material'
import { ShoppingCartSharp } from '@mui/icons-material'
import  makeStyles from './style';
import image from '../../constants/image';
import { Link, useLocation } from 'react-router-dom';


const Navbar = ({totalItems}) => {
    const classes = makeStyles();
    const location = useLocation();
  return (
    <>
    <AppBar position='fixed' color= 'inherit' className={classes.AppBar}>
    <Toolbar>
        <Typography className={classes.title} color='inherit' component={Link} to='/'>
            <img src={image.logo} alt='commercejs' height='25px' className={classes.images} />
        </Typography>
        <div className={classes.grow} />
        {location.pathname  === '/' && (
         <IconButton  aria-label='show cart items' color='inherit'  component={Link} to='/cart'>
         <Badge badgeContent={totalItems} color='secondary' >
         <ShoppingCartSharp/>
         </Badge>
         </IconButton>
         
        )}
       
    </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar