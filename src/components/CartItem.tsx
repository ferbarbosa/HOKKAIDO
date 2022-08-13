import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';

interface Props {
    id:number;
    name:string;
    cover:string;
    price:number;
    quantity:number;
    selectedColor:string;
    selectedSize:string;
};

export const CartItem: React.FC<Props>  = ({id,name, cover, price, quantity, selectedColor, selectedSize}) => {

    const [removed, setremoved] = useState(false);

    const removeOneItem = (name:any) => {
        const localItems = localStorage.getItem('CART_LIST');
        if(localItems){
            let arrayLocalItems = JSON.parse(localItems);
            arrayLocalItems = arrayLocalItems.filter((arrayLocalItem:any) => arrayLocalItem.name !== name);
            localStorage.setItem('CART_LIST', JSON.stringify(arrayLocalItems));
            window.dispatchEvent(new Event("storage"));
            setremoved(true);
        }
    }


    useEffect(() => {
        setremoved(false);
    }, [removed])



  return (
    <Grid
        container spacing={0} 
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        style={{
            backgroundColor: id % 2 === 0 ? 'transparent' : 'rgb(245, 245, 245)',
        }}
    >
        <Grid item xs={2} 
        
            style={{
                margin: '5px',
                height: '90px',
                width: '90px',
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
                    <Grid   container
                            direction="row"
                            alignItems="center"
                    >
                        <div
                                style={{
                                    backgroundColor: selectedColor,
                                    borderRadius: '50%',
                                    border: 'solid black 1px',
                                    height: '10px',
                                    width: '10px',
                                    margin: '0',
                                    marginRight: '5px',
                                }}
                           >
                        </div>
                                
                        <p
                            style={{
                                fontFamily: 'Oxygen',
                                fontSize: '12px',
                                 fontWeight: '700',
                               }}
                            >
                                {selectedSize}
                        </p>
                        <div
                            style={{
                                marginLeft: '5px',
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: 'Oxygen',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    margin: '0',
                                }}
                            >Qtd:{quantity}</p>
                        </div>
                    </Grid>  
                    <p
                        style={{
                            fontFamily: 'Oxygen',
                            fontSize: '12px',
                            margin: '0',
                        }}
                    >
                        <button 
                            onClick={() => removeOneItem(name)}
                            style={{
                                backgroundColor: 'transparent',
                                fontFamily: 'Oxygen',
                                cursor: 'pointer',
                                border: 'none',
                                color: 'rgb(190, 68, 74)',
                                fontSize: '12px',
                                fontWeight: '700',
                                margin: '0',
                                padding: '0',
                            }}
                        >
                            Remove
                        </button>   
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
