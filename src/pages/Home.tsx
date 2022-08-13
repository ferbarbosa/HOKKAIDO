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
import { AnyARecord } from 'dns';


export default function Home() {

  const [popular, setPopular] = useState<Array<any>>([]);
  const [fetched, setFetched] = useState<boolean>(false);


  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);
    if (!fetched) {

      setFetched(true);

      api.get('/items/?limit=' + 10)
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
          <p className="PopularText">Popular</p>
        </div>

        <div className="Popular">
          <Slider {...PopularSettings}>
            {
              popular.map((item: any, index:any) => {
                return (
                  <div className="PopularItem" key={index}>
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
            {
              popular.map((item: any, index:any) => {
                return (
                  <div className="PopularItem" key={index}>
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

      </div>


    </div>
  )
}