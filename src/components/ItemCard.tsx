import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ItemCard() {
  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea sx={{margin: '1px'}}>
        <CardMedia
          component="img"
          height="400"
          image="https://img.ltwebstatic.com/images3_pi/2021/04/27/1619486350277582df35f2eda5bd2e83fc7586708e_thumbnail_405x552.webp"
          alt="Product Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
              CROPPED TIPE A
          </Typography>
          <a>$24,90</a>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
