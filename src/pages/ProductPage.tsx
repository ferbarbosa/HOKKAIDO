import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import '../styles/productPage.css';

//icons
import StraightenIcon from '@mui/icons-material/Straighten';

interface Props {
  name:string;
  cover:string;
  price:number;
  size:string;
  color:string;
};


const FakeData = [
  {
    "name": "White T-Shirt",
    "coverImg": "https://elevennewyork.com/wp-content/uploads/2018/02/04_white-tee_model-back-scaled-680x935.jpg",
    "color":["white","black","blue", "yellow", "red"],
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



export const ProductPage: React.FC<Props>  = ({name, cover, price, size, color}) => {

  const [selectedColor, setselectedColor] = useState<string>('white');
  const [selectedSize, setSelectedSize] = useState<string>(FakeData[0].size[0]);

  const changeColor = (color:string) => {
    setselectedColor(color);
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
        <Grid item xs={6} sx={{'&.MuiGrid-item': {padding: '30px', paddingTop: '20px'}}}>
          <img className="mainImg" src={FakeData[0].coverImg}/>
          <Typography variant="caption" display="block" gutterBottom>
            Click on the image to zoom in
          </Typography>
        </Grid>

        <Grid item xs={6} sx={{'&.MuiGrid-item': {padding: '30px', paddingTop: '8px'}}}>

          <h1 className="nameTxt" >
            {FakeData[0].name}
          </h1>

          <p className="labelTxt">
            Select the color: 
              <span className="selectedTxt">
                {selectedColor}
              </span>
          </p>

          <div>
            {
              FakeData[0].color.map((color) => <button className="colorSelect" style={{backgroundColor: color}} onClick={() => changeColor(color)} ></button>)
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
              FakeData[0].size.map((size) => 
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
            <Typography variant="caption" sx={{	fontWeight: 400 }}>Size table</Typography>

          </div>

          <p>Price: $149.99</p>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductPage;
