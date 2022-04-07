import React from 'react'
import Grid from '@mui/material/Grid';

interface Props {
    name:string;
    cover:string;
    price:number;
    quantity:number;
};

export const CartItem: React.FC<Props>  = ({name, cover, price, quantity}) => {
  return (
    <Grid
        container spacing={1} 
        justifyContent="center"
    >
        <Grid item xs={2} >
            <img src={cover ? cover : "cover here"} style={{width: "40px"}} />
        </Grid>
        <Grid item xs={4} >
            {name ? name : "Name here"}
        </Grid>
        <Grid item xs={3}>
            {price ? price : "$00.00"}
        </Grid>
        <Grid item xs={2}>
            - {quantity ? quantity : "0"} +
        </Grid>
    </Grid>
  )
}

export default CartItem;
