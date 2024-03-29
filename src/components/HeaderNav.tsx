import React, { Component, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Routes, Route, Link, useRoutes } from "react-router-dom";
import { motion } from "framer-motion"

//mobile menu
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InventoryIcon from '@mui/icons-material/Inventory';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';

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
    const [searchBar, setSearchBar] = useState<string>('');
    const [authType, setAuthType] = useState<string>('login');
    const [username, setUserName] = useState<string>('');
    const [mobileDropDownUser, setMobileDropDownUser] = useState<boolean>(false);
    const [updateCart, setUpdateCart] = useState<boolean>(false);


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
        setMobileMenu(!mobileMenu);
    }

    const handleLogin = (event: any) => {
        setLoginError(false);
        event.preventDefault();
        api.post('/auth', { email, password })
            .then(function (response: any) {
                if (response.data.email) {
                    localStorage.setItem("CURRENT_USER", JSON.stringify({ "email": response.data.email, "userId": response.data.userId, "username": response.data.username }));
                    window.location.href = '/';
                }

            })
            .catch(function (error: any) {
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

    const handleSearch = (event: any) => {
        event.preventDefault();
        window.location.href = '/catalog/' + searchBar;
    }

    useEffect(() => {
        if(!updateCart){
            const localItems = localStorage.getItem('CART_LIST');


            if (localItems) {
                const arrayLocalItems = JSON.parse(localItems);
                setCartItems(arrayLocalItems)

            }

            settotalItemsCart(cartItems.length);
            setUpdateCart(true);
        }

        window.addEventListener("storage", (e) => {
            const localItems = localStorage.getItem('CART_LIST');


            if (localItems) {
                const arrayLocalItems = JSON.parse(localItems);
                setCartItems(arrayLocalItems)

            }

            settotalItemsCart(cartItems.length);
        });
        

        

    }, [anchorEl, cartItems]);

    useEffect(() => {
        var total = 0;
        cartItems.map((item, index) => {
            total += Number(item.price * item.quantity);
        })
        settotalCartValue(total.toFixed(2));

    }, [totalItemsCart, updateCart])


    useEffect(() => {
        const localUser = localStorage.getItem('CURRENT_USER');
        if (localUser) {
            const user = JSON.parse(localUser);
            setUser(user);
        } else {
            setUser(false);
        }
    }, [])

    const openFavorite = () => {
        const localUser = localStorage.getItem('CURRENT_USER');

        if (localUser) {
            console.log("favorite page");
        } else {
            handleOpenLogin();
        }
    }

    const handleBuy = (event: any) => {
        event?.preventDefault();
        const localUser = localStorage.getItem('CURRENT_USER');
        if(localUser){
            const user = JSON.parse(localUser);
        }

        let userId = user ? user.userId : 0;
        let itemsIds:Array<string> = [];
        let status = 'Waiting Confirmation';

        cartItems.map((item, index) => {
            itemsIds.push(item.itemId);
        })

        const data = JSON.stringify({
            userId: userId,
            items: itemsIds,
            status: status
        })

        const config = {
            headers: {'Content-Type': 'application/json'}
        }

        api.post('/order', data, config).then(function (response: any) {
            localStorage.removeItem("CART_LIST");
            window.dispatchEvent(new Event("storage"));
            window.location.href = '/account/orders';
        }).catch(function (error: any) {
            console.log(error);
        });
    }

    const handleRegister = (event: any) => {
        event.preventDefault();
        api.post('/adduser', { username, email, password })
            .then(function (response: any) {
                if (response.data.email) {
                    localStorage.setItem("CURRENT_USER", JSON.stringify({ "email": response.data.email, "userId": response.data.userId, "username": response.data.username }));
                    window.location.href = '/';
                }

            })
            .catch(function (error: any) {
                console.log(error);
                setLoginError(true);
                setemail('');
                setpassword('');
            })
    }

    const changeAuthType = (type: string) => {
        setAuthType(type);
        setLoginError(false);
    }





    //ANIMATION AREA

    return (
        <Box sx={{ width: '100%' }}>
            <Grid
                container spacing={1}
                justifyContent="center"
                alignItems="center"
            >
                <Box className="LogoAndButtons">
                    <div className="MobileButtons">
                        <IconButton onClick={showMobileMenu}>
                            <MenuIcon
                                fontSize="large"
                            />
                        </IconButton>
                        <Drawer
                            className="MobileDrawer"
                            anchor={"right"}
                            open={mobileMenu}
                            onClose={() => setMobileMenu(false)}
                            sx={{
                                '& .css-1160xiw-MuiPaper-root-MuiDrawer-paper': { width: '60%' }
                            }}
                        >
                            <div
                                className='MobileDrawerContent'
                            >
                                <div
                                    className='MobileUserArea'
                                >
                                    {user ?
                                        <>
                                            <button className="MobileUserBox" onClick={() => setMobileDropDownUser(!mobileDropDownUser)}>
                                                <p className='MobileUserName'>
                                                    {user.username}
                                                </p>
                                                <KeyboardArrowDownIcon sx={{ color: 'rgb(196, 196, 196)' }} />

                                            </button>
                                            <p className='MobileUserEmail'>{user.email}</p>

                                            {
                                                mobileDropDownUser ?
                                                    <div className='MobileUserOptions'>
                                                        <div>
                                                            <AccountCircleIcon sx={{ color: 'rgb(196, 196, 196)' }} />
                                                            <a className='MobileDrawerButtonText' href="/account/profile">Profile</a>
                                                        </div>
                                                        <div>
                                                            <InventoryIcon sx={{ color: 'rgb(196, 196, 196)' }} />
                                                            <a className='MobileDrawerButtonText' href="/account/orders">Orders</a>
                                                        </div>
                                                    </div>
                                                    : null

                                            }

                                        </>
                                        : null
                                    }
                                </div>
                                <Link
                                    className='MobileDrawerButton'
                                    to="/"
                                >
                                    <HomeIcon sx={{ color: 'rgba(0,0,0,0.9)' }} />
                                    <p>
                                        HOME
                                    </p>
                                </Link>
                                <Link
                                    className='MobileDrawerButton'
                                    to="/catalog/sale"
                                >
                                    <LoyaltyIcon sx={{ color: 'rgba(0,0,0,0.9)' }} />
                                    <p>
                                        SALE
                                    </p>
                                </Link>
                                <Link
                                    className='MobileDrawerButton'
                                    to="/catalog/female"
                                >
                                    <CheckroomIcon sx={{ color: 'rgba(0,0,0,0.9)' }} />
                                    <p>
                                        FEMALE
                                    </p>
                                </Link>
                                <Link
                                    className='MobileDrawerButton'
                                    to="/catalog/male"
                                >
                                    <CheckroomIcon sx={{ color: 'rgba(0,0,0,0.9)' }} />
                                    <p>
                                        MALE
                                    </p>
                                </Link>
                                <div className='MobileIconsButtons'>
                                    <IconButton onClick={openCart}>
                                        <ShoppingCartIcon fontSize="large" sx={{ color: 'rgba(0,0,0,0.9)' }} />
                                    </IconButton>
                                    <IconButton onClick={openFavorite}>
                                        <FavoriteIcon fontSize="large" sx={{ color: 'rgba(0,0,0,0.9)' }} />
                                    </IconButton>
                                    {
                                        user ?
                                            <IconButton onClick={handleLogout}>
                                                <LogoutIcon fontSize="large" sx={{ color: 'rgba(0,0,0,0.9)' }} />
                                            </IconButton>
                                            :
                                            <IconButton onClick={handleOpenLogin}>
                                                <AccountCircleIcon fontSize="large" sx={{ color: 'rgba(0,0,0,0.9)' }} />
                                            </IconButton>
                                    }

                                </div>
                            </div>
                        </Drawer>
                    </div>
                    <a className="LogoArea">
                        HOKKAIDO
                    </a>

                    <div className="MenuButton">
                        <span className='wellcomeTxt'>
                            Wellcome to HOKKAIDO {
                                user ? (
                                    <div className="dropdown">
                                        <button className="dropbtn"><a className='DropdownText'>{user.username}</a> <KeyboardArrowDownIcon /></button>
                                        <div className="dropdown-content">
                                            <a href="/account/profile">Profile</a>
                                            <a href="/account/orders">Orders</a>
                                            <button onClick={handleLogout} >Sign Out</button>
                                        </div>
                                    </div>
                                ) : null}

                        </span>
                        {user ?

                            null
                            :
                            <IconButton onClick={handleOpenLogin} sx={{ p: 1 }}>
                                <AccountCircleIcon />
                            </IconButton >
                        }
                        <IconButton sx={{ p: 1 }} onClick={openCart}>
                            <ShoppingCartIcon />
                        </IconButton >
                        <IconButton sx={{ p: 1 }} onClick={openFavorite}>
                            <FavoriteIcon />
                        </IconButton>
                    </div>

                </Box>
            </Grid>



            <Grid container justifyContent="center">
                <form
                    onSubmit={handleSearch}
                    style={{ "width": "60%" }}
                >
                    <InputBase
                        className='SearchBar'
                        id="searchBar"
                        value={searchBar}
                        onChange={(e) => setSearchBar(e.target.value)}
                        sx={{ "width": "100%" }}
                        placeholder="Search for something..."
                    />
                </form>
            </Grid>

            <div
                className="NavContainer"
            >
                <Link className="NavOption" to="/">HOME</Link>
                <Link className="NavOption" to="/">SALE</Link>
                <Link className="NavOption" to="/catalog/female">FEMALE</Link>
                <Link className="NavOption" to="/catalog/male">MALE</Link>
                <Link className="NavOption" to="/catalog/shirt">SHIRTS</Link>
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
                    '& .MuiPopover-paper': { padding: '15px' }
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

                {cartItems.length > 0 ?
                    cartItems.map((item, index) => ((
                        <div>
                            <CartItem
                                key={index}
                                id={index}
                                name={item.name}
                                cover={item.cover[0]}
                                price={item.price}
                                quantity={item.quantity}
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

                <button className="buyButton" onClick={handleBuy}>
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
                sx={{
                    ['@media (max-width:500px)']: {
                        '& .css-ppttlb': {
                            width: '80%'
                        }
                    }
                }}
            >
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        height: 400,
                        boxShadow: 24,
                        p: 4,
                    }}

                    className="loginModal"
                >
                    {
                        authType === 'login' ? (
                            <motion.div
                                key={authType}
                                initial={{ opacity: 0.4 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.9 }}
                            >
                                <p className="loginTitleTxt">Login to your account:</p>
                                <Box
                                    component="form"
                                    onSubmit={handleLogin}
                                    sx={{
                                        '& .MuiTextField-root': { width: '100%', },
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


                                <p>Don't have account? <button onClick={() => changeAuthType('register')} className="register-button" >Register now!</button></p>

                            </motion.div>

                        ) : (
                            <motion.div
                                key={authType}
                                initial={{ opacity: 0.4 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.9 }}
                            >
                                <p className="loginTitleTxt">Create a new account:</p>
                                <Box
                                    component="form"
                                    onSubmit={handleRegister}
                                    sx={{
                                        '& .MuiTextField-root': { width: '100%', },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    {
                                        loginError ? <p className="failLoginTxt">Email or password incorrect</p> : null
                                    }
                                    <TextField
                                        helperText="Please enter your username"
                                        id="username"
                                        label="Username"
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
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
                                        helperText="Please enter your email"
                                        id="email"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
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
                                            Register
                                        </p>
                                    </button>

                                </Box>


                                <p>Already have a account? <button onClick={() => changeAuthType('login')} className="register-button" >login!</button></p>

                            </motion.div>
                        )
                    }

                </Box>
            </Modal >

        </Box >
    )
}
