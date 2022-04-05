import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Routes, Route, Link } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from "react-slick";
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

import ItemCard from '../components/ItemCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../App.css';
import '../styles/home.css'

//icons
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

//Images
import banner1 from '../resources/images/banner1.png';
import banner2 from '../resources/images/banner2.png';
import banner3 from '../resources/images/banner3.png';
import banner4 from '../resources/images/banner4.png';

export default function Home() {
  
    const CarouselSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
    };

    const PopularSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
    };

    const PopularSettingsMobile = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
    };

    return (
        <div>
            <div className="Carousel">
              <Slider {...CarouselSettings}
              >
                <div >
                  <img className="CarouselImg" src={banner1} alt="Promo Image" />
                </div>
                <div>
                  <img className="CarouselImg" src={banner2} alt="Promo Image" />
                </div>
                <div>
                  <img className="CarouselImg" src={banner3} alt="Promo Image" />
                </div>
                <div>
                  <img className="CarouselImg" src={banner4} alt="Promo Image" />
                </div>
              </Slider>
            </div>

            <div >
              <div>
                <p className="PopularText">Popular:</p>
              </div>

              <div className="Popular">
                <Slider {...PopularSettings}>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                </Slider>
              </div>
              
              <div className="PopularMobile">
                <Slider {...PopularSettingsMobile}>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                  <div className="PopularItem">
                    <ItemCard />
                  </div>
                </Slider>
              </div>
              
            </div>


            <footer>
              <Grid
                container spacing={1} 
                justifyContent="center"
                className="Footer"
              >

                <Grid item xs={3}>

                </Grid>

                <Grid item xs={1}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Company Info
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    About us
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Affiliate
                  </Typography>
                </Grid>

                <Grid item xs={1}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Help & Support
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Returns
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Size guide
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Online Support
                  </Typography>
                </Grid>

                <Grid item xs={1}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Customer care
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Contact Us
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Customer Area
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Points
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Find us on
                  </Typography>
                  <InstagramIcon />
                  <TwitterIcon />
                  <YouTubeIcon />
                  <Typography variant="overline" display="block" gutterBottom>
                    Sign up for news
                  </Typography>
                  <InputBase
                        className="EmailNewsLetter"
                        sx={{ width: '40%' }}
                        placeholder="Email here..."
                  />
                  <button className="ButtonNewsLetter">RECEIVE</button>
                  <Typography variant="caption" display="block" gutterBottom>
                    By clicking the SUBSCRIBE button, you are agreeing to ourPrivacy & Cookie Policy
                  </Typography>
                </Grid>

              </Grid>
            </footer>

        </div>
    )
}