import React, { useEffect, useState } from 'react'
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
import { FoundationOutlined } from '@mui/icons-material';

interface Item {
  itemId: string;
  name: string;
  cover: Array<any>;
  price: string;
  size: Array<any>;
  color: Array<any>;
  description: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

interface Props {
  itemId: string;
}


export const ProductPage = () => {

  const [item, setItem] = useState<Item>({ itemId: '',name: 'Title', cover: ['img'], price: '99.99', size: [''], color: [''], description: '', selectedColor: '', selectedSize: '', quantity: 1 });
  const [selectedColor, setselectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedPreview, setSelectedPreview] = useState<string>('img')

  const [credCardPrice, setCredCardPrice] = useState<string>('0');
  const [showError, setShowError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<any>({ type: '', message: '' });



  const URLParams = useParams();


  //const axios = require('axios');

  useEffect(() => {
    api.get('/items/' + URLParams.id)
      .then(function (response: any) {
        // handle success
        setItem({
          itemId: response.data.itemId,
          name: response.data.title,
          cover: response.data.img,
          price: response.data.price,
          size: response.data.size,
          color: response.data.color,
          description: response.data.description,
          selectedColor: '',
          selectedSize: '',
          quantity: 1,
        });

        setSelectedPreview(response.data.img[0]);


        const credValue = (Number(response.data.price) / 4) * 0.9;

        setCredCardPrice(credValue.toFixed(2));
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      })
  }, [])



  const addToCart = (item: Item) => {

    const items = localStorage.getItem("CART_LIST");

    if (item.selectedColor === '' || !item.selectedColor) {
      setShowError(true);
      setErrorText({
        type: 'color',
        message: 'Please select a color'
      });
      return;
    } else if (item.selectedSize === '' || !item.selectedSize) {
      setShowError(true);
      setErrorText({
        type: 'size',
        message: 'Please select a size'
      });
      return;
    }



    if (items) {
      const arrayItems = JSON.parse(items);
      let foundOne = false;

      arrayItems.map((found:any) => {
        if (found.itemId === item.itemId && found.selectedColor === item.selectedColor && found.selectedSize === item.selectedSize) {
          found.quantity += 1;
          foundOne = true;
        }
      })

      if(foundOne){
        let newArray = JSON.stringify(arrayItems);
        localStorage.setItem("CART_LIST", newArray);
        window.dispatchEvent(new Event("storage"));
        return;
      }

      const putInOne = [...arrayItems, item];
      const newItems = JSON.stringify(putInOne);
      localStorage.setItem("CART_LIST", newItems);
      window.dispatchEvent(new Event("storage"));

    } else {
      localStorage.setItem("CART_LIST", JSON.stringify([item]));
      window.dispatchEvent(new Event("storage"));
    }
  }

  const changeColor = (color: string) => {
    setselectedColor(color);
    setShowError(false);
    setItem({
      itemId: item.itemId,
      name: item.name,
      cover: item.cover,
      price: item.price,
      size: item.size,
      color: item.color,
      description: item.description,
      selectedColor: color,
      selectedSize: item.selectedSize,
      quantity: item.quantity,
    });
  }

  const changePreview = (preview: string) => {
    setSelectedPreview(preview);
  }

  const changeSize = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string,
  ) => {
    setSelectedSize(newSize);
    setShowError(false);
    setItem({
      itemId: item.itemId,
      name: item.name,
      cover: item.cover,
      price: item.price,
      size: item.size,
      color: item.color,
      description: item.description,
      selectedColor: item.selectedColor,
      selectedSize: newSize,
      quantity: item.quantity,
    });
  };

  return (
    <Container>
      <Grid
        container spacing={1}
        justifyContent="center"
      >
        <Grid item xs={12} md={1} 
          sx={{
            ['@media (max-width:899px)']: {
              display: 'none'
            }
          }}
        >
          {
            item.cover.map((cover:any, index:any) =>
              <button
                className="selectPreviewButton"
                onClick={() => changePreview(cover)}
                key={index}
              >
                <img
                  className="selectPreviewImg"
                  src={cover}
                />
              </button>)

          }
        </Grid>
        <Grid 
          className="imgBox" item xs={12} md={6} 
          sx={{ 
            '&.MuiGrid-item': {
              padding: '30px', 
              paddingTop: '20px' 
            },
          }}>
          <img className="mainImg" src={selectedPreview} />
          <Typography variant="caption" display="block" gutterBottom>
            Click on the image to zoom in
          </Typography>
        </Grid>

        {/* mobile version */}
        <Grid item xs={12} md={1} 
          sx={{
            ['@media (min-width:900px)']: {
              display: 'none'
            }
          }}
        >
          {
            item.cover.map((cover:any, index:any) =>
              <button
                className="selectPreviewButton"
                onClick={() => changePreview(cover)}
                key={index}
              >
                <img
                  className="selectPreviewImg"
                  src={cover}
                />
              </button>)

          }
        </Grid>
        

        <Grid item xs={12} md={5} 
          sx={{ '&.MuiGrid-item': { padding: '30px', paddingTop: '8px' } 
        }}>

          <h1 className="nameTxt" >
            {item.name}
          </h1>

          <p className="labelTxt">
            Select the color:
            <span className="selectedTxt">
              {selectedColor}
            </span>
          </p>
          {
            showError && errorText.type === 'color' ? <p className="errorTxt">{errorText.message}</p> : null
          }

          <div>
            {
              item.color.map((color:any, index:any) => <button key={index} className="colorSelect" style={{ backgroundColor: color }} onClick={() => changeColor(color)} ></button>)
            }
          </div>

          <p className="labelTxt">
            Select the size:
            <span className="selectedTxt" >
              {selectedSize}
            </span>
          </p>
          {
            showError && errorText.type === 'size' ? <p className="errorTxt">{errorText.message}</p> : null
          }

          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={changeSize}
          >

            {
              item.size.map((size:any, index:any) =>
                <ToggleButton
                  key={index}
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
            <Typography variant="caption" sx={{ fontWeight: 400 }}>Size table</Typography>

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

            <Grid item xs={10} >
              <button className="addToCartButton"><p className="cartButtonTxt" onClick={() => addToCart(item)}>Add to cart</p></button>
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
