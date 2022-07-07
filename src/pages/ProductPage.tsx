import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";

import api from "../services/api";

import '../styles/productPage.css';

//icons
import StraightenIcon from '@mui/icons-material/Straighten';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface Item {
  name:string;
  cover:Array<any>;
  price:string;
  size:Array<any>;
  color:Array<any>;
  description: string;
};

interface Props {
  itemId: string;
}


const FakeData = [
  {
    "name": "White T-Shirt",
    "coverImg": ["https://elevennewyork.com/wp-content/uploads/2018/02/04_white-tee_model-back-scaled-680x935.jpg", "https://rukminim2.flixcart.com/image/714/857/kfoapow0-0/shirt/g/j/w/m-hlsh008832-highlander-original-imafw2ggmtfqgqkj.jpeg?q=50"],
    "color":["white","black","blue", "yellow", "red"],
    "size": ["P","G","GG","XG"],
    "price": 39.99,
    "description":"A short description of this white T-Shirt.",
    "category": ["man","tshirt"]
  },
  {
    "name": "Red Dress",
    "coverImg": ["https://i.pinimg.com/originals/d3/bd/f8/d3bdf848490aa7b71950cbc931f75cf5.jpg"],
    "color":["red"],
    "size": ["P","G","GG","XG"],
    "price": 59.99,
    "description":"A short description of this Red Dress.",
    "category": ["woman","dress"]
  },
  {
    "name": "Nike Air Jordan",
    "coverImg": ["https://40378.cdn.simplo7.net/static/40378/sku/masculino-tenis-nike-air-jordan-1-mid--p-1615292373886.jpg"],
    "color":["black"],
    "size": ["41","42","43","44"],
    "price": 89.99,
    "description":"A short description of this Nike shoes.",
    "category": ["man","woman","shoes"]
  },
];



export const ProductPage  = () => {
  const [selectedColor, setselectedColor] = useState<string>('white');
  const [selectedSize, setSelectedSize] = useState<string>(FakeData[0].size[0]);
  const [selectedPreview, setSelectedPreview] = useState<string>(FakeData[0].coverImg[0])

  const [credCardPrice, setCredCardPrice] = useState<string>('0');

  const [item, setItem] = useState<Item>({name: 'Title', cover: ['img'], price: '99.99', size: [''], color: [''], description: ''});

  const URLParams = useParams();
  

  //const axios = require('axios');

  useEffect(() => {
    console.log(URLParams)
    //tenho que arrumar
    api.get('/items/'+URLParams.id)
    .then(function (response:any) {
      // handle success
      setItem({
        name: response.data.title,
        cover: response.data.img,
        price: response.data.price,
        size: response.data.size,
        color: response.data.color,
        description: response.data.description
      });

      const credValue = (Number(response.data.price) / 4) * 0.9;

      setCredCardPrice(credValue.toFixed(2));
    })
    .catch(function (error:any) {
      // handle error
      console.log(error);
    })
  }, [])
  



  const changeColor = (color:string) => {
    setselectedColor(color);
  }

  const changePreview = (preview:string) => {
    setSelectedPreview(preview);
  }

  const changeSize = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string,
  ) => {
    setSelectedSize(newSize);
  };

  return (
    <Container>
      <Grid 
        container spacing={1} 
        justifyContent="center"
      >
        <Grid item xs={1}>
          {
            item.cover.map((cover,index) => <button className="selectPreviewButton" onClick={() => changePreview(item.cover[index])} > <img className="selectPreviewImg" src={item.cover[index]} /> </button>)
          
          }
        </Grid>
        <Grid className="imgBox" item xs={6} sx={{'&.MuiGrid-item': {padding: '30px', paddingTop: '20px'}}}>
          <img className="mainImg" src={selectedPreview}/>
          <Typography variant="caption" display="block" gutterBottom>
            Click on the image to zoom in
          </Typography>
        </Grid>

        <Grid item xs={5} sx={{'&.MuiGrid-item': {padding: '30px', paddingTop: '8px'}}}>

          <h1 className="nameTxt" >
            {item.name}
          </h1>

          <p className="labelTxt">
            Select the color: 
              <span className="selectedTxt">
                {selectedColor}
              </span>
          </p>

          <div>
            {
              item.color.map((color) => <button className="colorSelect" style={{backgroundColor: color}} onClick={() => changeColor(color)} ></button>)
            }
          </div>

          <p className="labelTxt">
            Select the size: 
              <span className="selectedTxt" >
                {selectedSize}
              </span>
          </p>

          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={changeSize}
          >

            {
              item.size.map((size) => 
                <ToggleButton 
                  sx={{
                    color: 'black', 
                    '&.Mui-selected': {
                      backgroundColor: 'black',
                      color: 'white',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                    },
                  }} 
                  value={size} >{size}
                </ToggleButton>)
            }

          </ToggleButtonGroup>
          
          <div 
            style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <StraightenIcon />
            <Typography variant="caption" sx={{	fontWeight: 400}}>Size table</Typography>

          </div>

          <Grid 
            container spacing={1} 
            alignItems="center"
            className="priceBox"
          >

            <Grid item xs={6} className="priceTxt">
              <p>${item.price}</p>
            </Grid>

            <Grid item xs={6} className="creditCardtxt">
              <p>Credit card 4x ${credCardPrice}</p>
              <p>10% Off</p>
            </Grid>
            
            <Grid  item xs={10} >
              <button className="addToCartButton"><p className="cartButtonTxt">Add to cart</p></button>
            </Grid>
            <Grid item xs={2} >
              <button className="addFavoriteButton"><FavoriteBorderIcon className="addFavoriteHeart" /></button>
            </Grid>

          </Grid>
          
        </Grid>
        <Grid item xs={12} >
          <p className="labelTxt">
            Description:
          </p>
          <p>
            {item.description}
          </p>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductPage;
