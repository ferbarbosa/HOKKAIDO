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
        container spacing={0} 
        justifyContent="space-between"
        direction="row"
        alignItems="center"
    >
        <Grid item xs={2} 
        
            style={{
                margin: '5px',
                height: '70px',
                width: '60px',
            }}
        
        >
            <img src={cover ? cover : "cover here"} style={{width: "100%", height: "100%"}} />
        </Grid>

        <Grid item xs={9}>

            <Grid
                container spacing={1} 
                justifyContent="space-between"
                direction="row"
                alignItems="center"
            >
                <Grid item xs={12} >
                    <p
                        style={{
                            fontFamily: 'Oxygen',
                            fontSize: '15px',
                            fontWeight: '700',
                            margin: '0',
                            marginBottom: '15px',
                        }}  
                    >
                        {name ? name : "Name here"}
                    </p>
                </Grid>
                <Grid item xs={8}>
                    <p
                        style={{
                            fontFamily: 'Oxygen',
                            fontSize: '12px',
                            margin: '0',
                        }}
                    >
                        Quantity: {quantity ? quantity : "0"}
                    </p>
                </Grid>
                <Grid item xs={4}>
                    <p
                        style={{
                            fontFamily: 'Oxygen',
                            fontSize: '15px',
                            fontWeight: '700',
                            margin: '0',
                        }}                    
                    > 
                        ${price ? price : "$00.00"} 
                    </p>
                </Grid>

            </Grid>
        </Grid>
        
    </Grid>
  )
}

export default CartItem;
