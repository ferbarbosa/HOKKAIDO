import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import { Routes, Route, Link } from "react-router-dom";
import Home from '../pages/Home';
import About from '../pages/About';

//My components
import CartItem from '../components/CartItem';


//Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MenuIcon from '@mui/icons-material/Menu';

import '../styles/nav.css';


const FakeData = [
    {
      "name": "White T-Shirt",
      "coverImg": "https://elevennewyork.com/wp-content/uploads/2018/02/04_white-tee_model-back-scaled-680x935.jpg",
      "color":["white"],
      "size": ["P","G","GG","XG"],
      "price": 39.99,
      "description":"A short description of this white T-Shirt.",
      "category": ["man","tshirt"]
    },
    {
      "name": "Red Dress",
      "coverImg": "https://i.pinimg.com/originals/d3/bd/f8/d3bdf848490aa7b71950cbc931f75cf5.jpg",
      "color":["red"],
      "size": ["P","G","GG","XG"],
      "price": 59.99,
      "description":"A short description of this Red Dress.",
      "category": ["woman","dress"]
    },
    {
      "name": "Nike Air Jordan",
      "coverImg": "https://40378.cdn.simplo7.net/static/40378/sku/masculino-tenis-nike-air-jordan-1-mid--p-1615292373886.jpg",
      "color":["black"],
      "size": ["41","42","43","44"],
      "price": 89.99,
      "description":"A short description of this Nike shoes.",
      "category": ["man","woman","shoes"]
    },
  ];

export default function HeaderNav() {

        const [value, setValue] = useState<string>('one');
        const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

        const openCart = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const closeCart = () => {
            setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        
        return (
            <Box sx={{ width: '100%' }}>
                <Grid   
                    container spacing={1} 
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box className="LogoAndButtons">

                        <a className="LogoArea">
                            HOKKAIDO
                        </a>

                        <div className="MenuButton">
                            <a>Wellcome to HOKKAIDO</a>
                            <IconButton sx={{ p: 1 }}>
                                <AccountCircleIcon />
                            </IconButton >
                            <IconButton sx={{ p: 1 }} onClick={openCart}>
                                <ShoppingCartIcon />
                            </IconButton >
                        </div>
                        
                        <div className="MobileButtons">
                             <IconButton sx={{ p: 1 }}>
                                <MenuIcon />
                            </IconButton >
                        </div>

                    </Box>
                </Grid>

                
                
                <Grid container justifyContent="center">
                     <InputBase
                        className="SearchBar"
                        sx={{ width: '60%' }}
                        placeholder="Search for something..."
                    />
                </Grid>
                
                <Tabs
                    value={value}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    centered
                    className="NavContainer"
                >
                    <Link className="NavOption" to="/">HOME</Link>
                    <Link className="NavOption" to="/">SALE</Link>
                    <Link className="NavOption" to="/">FEMALE</Link>
                    <Link className="NavOption" to="/product">MALE</Link>
                    <Link className="NavOption" to="/">T-SHIRTS</Link>
                    <Link className="NavOption" to="/">DRESSES</Link>
                    <Link className="NavOption" to="/">SHOES</Link>
                    <Link className="NavOption" to="/about">ABOUT</Link>

                    <a className="NavMobile">Menu</a>
                </Tabs>


                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={closeCart}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                >
                    <CartItem name={FakeData[0].name} cover={FakeData[0].coverImg} price={FakeData[0].price} quantity={1} />
                    <CartItem name={FakeData[1].name} cover={FakeData[1].coverImg} price={FakeData[1].price} quantity={5}  />
                    <Button variant="outlined">BUY</Button>
                </Popover>
            
            </Box>
        )
}
