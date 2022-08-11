import React, { Component, useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from "react-slick";
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

//My components
import ItemCard from '../components/ItemCard';

import api from "../services/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../App.css';
import '../styles/home.css'

//Images
import banner1 from '../resources/images/banner1.png';
import banner2 from '../resources/images/banner2.png';
import banner3 from '../resources/images/banner3.png';
import banner4 from '../resources/images/banner4.png';



const FakeData = [
  {
    "name": "White T-Shirt",
    "coverImg": "https://elevennewyork.com/wp-content/uploads/2018/02/04_white-tee_model-back-scaled-680x935.jpg",
    "color": ["white"],
    "size": ["P", "G", "GG", "XG"],
    "price": 39.99,
    "description": "A short description of this white T-Shirt.",
    "category": ["man", "tshirt"]
  },
  {
    "name": "Red Dress",
    "coverImg": "https://i.pinimg.com/originals/d3/bd/f8/d3bdf848490aa7b71950cbc931f75cf5.jpg",
    "color": ["red"],
    "size": ["P", "G", "GG", "XG"],
    "price": 59.99,
    "description": "A short description of this Red Dress.",
    "category": ["woman", "dress"]
  },
  {
    "name": "Nike Air Jordan",
    "coverImg": "https://40378.cdn.simplo7.net/static/40378/sku/masculino-tenis-nike-air-jordan-1-mid--p-1615292373886.jpg",
    "color": ["black"],
    "size": ["41", "42", "43", "44"],
    "price": 89.99,
    "description": "A short description of this Nike shoes.",
    "category": ["man", "woman", "shoes"]
  },
];






export default function Home() {

  const [popular, setPopular] = useState<Array<any>>([]);
  const [fetched, setFetched] = useState<boolean>(false);


  useEffect(() => {
    if (!fetched) {

      setFetched(true);

      api.get('/items/?limit='+10)
        .then(function (response: any) {
          //popular.push(response.data);

          setPopular(response.data);

        })
        .catch(function (error: any) {
          console.log(error);
        })
    }

    return () => {
      setFetched(false);
    }
  }, [popular])


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
            {
              popular.map((item: any) => {
                return (
                  <div className="PopularItem">
                    <Link to={'/product/' + item.itemId} style={{ textDecoration: 'none' }} >
                      <ItemCard name={item.title} cover={item.img[0]} price={item.price} />
                    </Link>
                  </div>
                )
              }
              )
            }
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


    </div>
  )
}