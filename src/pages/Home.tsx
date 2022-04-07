import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Routes, Route, Link } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from "react-slick";
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

//My components
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
                    <ItemCard name={FakeData[0].name} cover={FakeData[0].coverImg} price={FakeData[0].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[1].name} cover={FakeData[1].coverImg} price={FakeData[1].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[2].name} cover={FakeData[2].coverImg} price={FakeData[2].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[0].name} cover={FakeData[0].coverImg} price={FakeData[0].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[1].name} cover={FakeData[1].coverImg} price={FakeData[1].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[2].name} cover={FakeData[2].coverImg} price={FakeData[2].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[0].name} cover={FakeData[0].coverImg} price={FakeData[0].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[1].name} cover={FakeData[1].coverImg} price={FakeData[1].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[2].name} cover={FakeData[2].coverImg} price={FakeData[2].price} />
                  </div>
                </Slider>
              </div>
              
              <div className="PopularMobile">
                <Slider {...PopularSettingsMobile}>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[0].name} cover={FakeData[0].coverImg} price={FakeData[0].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[0].name} cover={FakeData[0].coverImg} price={FakeData[0].price} />
                  </div>
                  <div className="PopularItem">
                    <ItemCard name={FakeData[0].name} cover={FakeData[0].coverImg} price={FakeData[0].price} />
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