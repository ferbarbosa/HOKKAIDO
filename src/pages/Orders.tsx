import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import api from '../services/api';
import Container from '@mui/material/Container';
import OrderCard from '../components/OrderCard';
import Grid from '@mui/material/Grid';

import '../styles/orders.css';

interface Items {
    id: string;
    itemsContent: Array<any>;
}

export const Orders: React.FC = () => {

    const [orders, setOrders] = useState<Array<any>>([]);
    const [items, setItems] = useState<Array<any>>([]);
    const [loadedItems, setLoadedItems] = useState<boolean>(false);
    const [completedLoad, setCompletedLoad] = useState<boolean>(false);

    const [fetched, setFetched] = useState<boolean>(false);

    function formatDate(string: any) {
        return new Date(string).toLocaleDateString();
    }

    useEffect(() => {



        const getOrder = async () => {
            if (!fetched) {
                setFetched(true);
                const localUser = localStorage.getItem('CURRENT_USER');
                if (localUser) {
                    const user = JSON.parse(localUser);
                    await api.get('/orders/' + user.userId)
                        .then(function (response: any) {
                            setOrders(response.data);
                        })
                        .catch(function (error: any) {
                            console.log(error);
                        })
                }

            }

            return () => {
                setFetched(false);
            }
        }

        getOrder();


    }, [orders]);

    useEffect(() => {

        if(!loadedItems){
            setLoadedItems(true);
                api.get('/items/?limit=0')
                    .then(function (response: any) {
                        setItems(response.data);
                        console.log(response.data);
                    }).catch(function (error: any) {
                        console.log(error);
                    });
        }

        return () => {
            setLoadedItems(false);
        }

    }, [items]);



    return (
        <div>


            <Container maxWidth="lg">
                <p>
                    <Link className='PagesCatalogLink' to="/">Account</Link>
                    /
                    <Link className='PagesCatalogLink' to={"/account/orders"}>Orders</Link>
                </p>
                <p className='YourOrdersTxt'>Seus pedidos</p>
                <Grid container spacing={1} className='OrdersBox'>
                    {
                        orders.map((order: any, index: any) => (
                            <Grid item xs={12} sm={12} md={12} key={index}>
                                <OrderCard cod={order.orderId} date={formatDate(order.createdAt)} status={order.status}>
                                {
                                    order.items.map((itemId: any, indexA: any) => (
                                        items.map((item: any, index: any) => {
                                            if(item.itemId === itemId){
                                                
                                                return (
                                                    <div>
                                                        <img src={item.img[0]} alt={item.title} key={index} />
                                                        <p key={index}>{item.title}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    ))
                                }
                                </OrderCard>
                            </Grid>
                        ))
                    }

                </Grid>
            </Container>
        </div>
    )
}

export default Orders
