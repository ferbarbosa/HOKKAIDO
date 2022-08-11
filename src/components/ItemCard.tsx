import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props {
  name:string;
  cover:string;
  price:number;
};

const ItemCard: React.FC<Props> = ({name, cover, price}) => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea sx={{margin: '1px'}}>
        <CardMedia
          component="img"
          height="400"
          image= {cover ? cover : "img.png"}
          alt="Product Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" 
            sx={{
              fontFamily:'Oxygen , sans-serif',
              fontWeight:'bold',
            }}
          >
              {name ? name : "A name here"}
          </Typography>
          <a style={{
            fontFamily:'Oxygen , sans-serif',
            fontSize:'1.5rem',
            fontWeight:'bold',
          }}
          >
            ${price ? price : "00.00"}
          </a>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ItemCard;
