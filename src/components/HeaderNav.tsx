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


//Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MenuIcon from '@mui/icons-material/Menu';

import '../styles/nav.css';

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
                    <Typography sx={{ p: 2 }}>Itens:</Typography>
                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                    <p>AAAAAAAAAAAAAAA</p><p>AAAAAAAAAAAAAAA</p><p>AAAAAAAAAAAAAAA</p><p>AAAAAAAAAAAAAAA</p><p>AAAAAAAAAAAAAAA</p><p>AAAAAAAAAAAAAAA</p>
                    <Button variant="outlined">BUY</Button>
                </Popover>
            
            </Box>
        )
}