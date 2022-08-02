import React, { Component, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Routes, Route, Link } from "react-router-dom";

//My components
import CartItem from '../components/CartItem';
import Divider from '../components/Divider';


//Services
import api from "../services/api";


//Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

import '../styles/nav.css';

export default function HeaderNav() {

        const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
        const [openLogin, setOpenLogin] = React.useState<boolean>(false);
        const [mobileMenu, setMobileMenu] = useState<boolean>(false);
        const [cartItems, setCartItems] = useState<Array<any>>([]);
        const [totalItemsCart, settotalItemsCart] = useState<number>(0)
        const [totalCartValue, settotalCartValue] = useState<string>('0');
        const [email, setemail] = useState<string>('');
        const [password, setpassword] = useState<string>('');
        const [user, setUser] = useState<any>(false);

        const [loginError, setLoginError] = useState<boolean>(false);
        

        const handleOpenLogin = () => setOpenLogin(true);
        const handleCloseLogin = () => setOpenLogin(false);

        const openCart = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const closeCart = () => {
            setAnchorEl(null);
        };

        const goToRegister = () => {
            handleCloseLogin();
            window.location.href = '/auth/register';
        }


        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        const showMobileMenu = () => {
            if(!mobileMenu){
                setMobileMenu(true);
            }else{
                setMobileMenu(false);
            }
            
        }
        

        const handleLogin = (event:any) => {
            setLoginError(false);
            event.preventDefault();
            api.post('/auth',{email, password})
            .then(function (response:any) {
                if(response.data.email){
                    localStorage.setItem("CURRENT_USER", email);
                    window.location.href = '/';
                }
                
            })
            .catch(function (error:any) {
                console.log(error);
                setLoginError(true);
                setemail('');
                setpassword('');
            })

            
        }

        const handleLogout = () => {
            localStorage.removeItem("CURRENT_USER");
            window.location.href = '/';
        }

        useEffect(() => {
            const localItems = localStorage.getItem('CART_LIST');
            

            if(localItems){
                const arrayLocalItems = JSON.parse(localItems);
                setCartItems(arrayLocalItems)
                
            }

            settotalItemsCart(cartItems.length);
            console.log(user);

            
            
            
        }, [anchorEl])

        useEffect(() => {
            var total = 0;
            cartItems.map((item, index) => {
                total += Number(item.price);
            })
            settotalCartValue(total.toFixed(2));
          
        }, [totalItemsCart])
        

        useEffect(() => {
            const localUser = localStorage.getItem('CURRENT_USER');
            if(localUser){
                setUser(localUser);
            }else{
                setUser(false);
            }
        } , [])

        const openFavorite = () => {
            const localUser = localStorage.getItem('CURRENT_USER');

            if(localUser){
                console.log("favorite page");
            }else{
                window.location.href = '/auth/login';
            }
        }
        

        
        
        
        return (
            <Box sx={{ width: '100%' }}>
                <Grid   
                    container spacing={1} 
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box className="LogoAndButtons">

                        <div className="MobileButtons">
                            
                        </div>

                        <a className="LogoArea">
                            HOKKAIDO
                        </a>

                        <div className="MenuButton">
                            <a>
                                Wellcome to HOKKAIDO {user ? user : null}

                            </a>
                            { user ?
                            
                                <IconButton onClick={handleLogout}>
                                    <LogoutIcon />
                                </IconButton>
                                :
                                <IconButton onClick={handleOpenLogin} sx={{ p: 1 }}>
                                    <AccountCircleIcon />
                                </IconButton >
                            }
                            
                            <IconButton sx={{ p: 1 }} onClick={openCart}>
                                <ShoppingCartIcon />
                            </IconButton >
                            <IconButton sx={{ p: 1}} onClick={openFavorite}>
                                <FavoriteIcon />
                            </IconButton>
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
                
                <div
                    className="NavContainer"
                >
                    <Link className="NavOption" to="/">HOME</Link>
                    <Link className="NavOption" to="/">SALE</Link>
                    <Link className="NavOption" to="/catalog/female">FEMALE</Link>
                    <Link className="NavOption" to="/catalog/male">MALE</Link>
                    <Link className="NavOption" to="/catalog/t-shirt">T-SHIRTS</Link>
                    <Link className="NavOption" to="/catalog/dress">DRESSES</Link>
                    <Link className="NavOption" to="/catalog/shoes">SHOES</Link>

                    <div className="NavMobile">

                    </div>
                </div>

                {
                    // CART AREA
                }

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={closeCart}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    sx={{
                        '& .MuiPopover-paper': {padding: '15px'}
                    }}
                >
                    <Grid
                        container
                        justifyContent="space-between"
                        direction="row"
                        alignItems="center"
                    >

                        <Grid item xs={3}>
                            <p className="cartTitleTxt">
                                Cart
                            </p>
                        </Grid>

                        <Grid item xs={3}>
                            <p className="cartItemTxt">
                                Items: {cartItems.length}
                            </p>
                        </Grid>
                        
                    </Grid>
                    <Divider color="black" size={1} type="dotted" />
                    
                        {totalItemsCart > 0 ? 
                            cartItems.map((item,index) => ((
                                    <div>
                                    <CartItem 
                                        key={index}
                                        id={index}
                                        name={item.name} 
                                        cover={item.cover[0]} 
                                        price={item.price} 
                                        quantity={1} 
                                        selectedColor={item.selectedColor}
                                        selectedSize={item.selectedSize}
                                    />
                                    
                                    </div>
                            )))

                        : <h1 className='emptyCart'>EMPTY</h1>
                            
                        }

                    <Divider color="black" size={1} type="dotted" />
                    <Grid
                        container spacing={0} 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={4}>
                            <p className="cartTotalTxt">
                                Total
                            </p>
                        </Grid>
                        <Grid item xs={4}>
                            <p className="cartTotalValueTxt">
                                ${totalCartValue}
                            </p>
                        </Grid>
                    </Grid>

                    <p className="cartCardTxt">
                            With hokkaido card 5% off
                    </p>

                    <button className="buyButton">
                        <p className="buyButtonTxt">BUY</p>
                    </button>
                </Popover>

                {
                    // LOGIN AREA
                }

                <Modal
                    open={openLogin}
                    onClose={handleCloseLogin}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box 
                        sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            boxShadow: 24,
                            p: 4,
                        }}

                        className="loginModal"
                    >
                        <p className="loginTitleTxt">Login to your account:</p>
                        <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{
                            '& .MuiTextField-root': { width: '100%',},
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            {
                                loginError ? <p className="failLoginTxt">Email or password incorrect</p> : null
                            }
                            <TextField
                                helperText="Please enter your email"
                                id="email"
                                label="Email"
                                value={email} 
                                onChange={(e) => setemail(e.target.value)}
                                error={loginError}
                                sx={{
                                    '& label.Mui-focused': {
                                        color: 'black',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderBottomColor: 'black',
                                      },
                                      '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                          borderColor: 'black',
                                        },
                                      },
                                }}
                            />
                            <TextField
                                helperText="Please enter your password"
                                id="password"
                                label="Password"
                                type="password"
                                value={password} 
                                onChange={(e) => setpassword(e.target.value)}
                                autoComplete="current-password"
                                error={loginError}
                                sx={{
                                    marginTop: 1,
                                    '& label.Mui-focused': {
                                        color: 'black',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderBottomColor: 'black',
                                      },
                                      '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                          borderColor: 'black',
                                        },
                                      },
                                }}
                            />
                            

                            <button className="loginButton" type="submit">
                                <p className="loginTxt">
                                    Login
                                </p>
                            </button>

                        </Box>

                        <p>Don't have account? <button onClick={goToRegister} className="register-button" >Register now!</button></p>
                        
                    </Box>
                </Modal>
            
            </Box>
        )
}
