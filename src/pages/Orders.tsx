import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import api from '../services/api';
import Container from '@mui/material/Container';
import OrderCard from '../components/OrderCard';
import Grid from '@mui/material/Grid';

interface Items {
    id: string;
    itemsContent: Array<any>;
}

export const Orders: React.FC = () => {

    const [orders, setOrders] = useState<Array<any>>([]);
    const [items, setItems] = useState<Array<Items>>([{ id: 'teste', itemsContent: [] }]);

    const [fetched, setFetched] = useState<boolean>(false);

    function formatDate(string: any) {
        return new Date(string).toLocaleDateString();
    }

    useEffect(() => {

        if (!fetched) {
            setFetched(true);
            const localUser = localStorage.getItem('CURRENT_USER');
            if (localUser) {
                const user = JSON.parse(localUser);
                api.get('/orders/' + user.userId)
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


    }, [orders]);

    const handleItems = (itemId: any) => {

        let itemValue:any = []

        api.get('/items/' + itemId)
            .then(function (response: any) {
                itemValue.push(response.data);

            })
            .catch(function (error: any) {
                console.log(error);
            })

        return itemValue;
    }





    return (
        <div>


            <Container maxWidth="lg">
                <p>
                    <Link className='PagesCatalogLink' to="/">Account</Link>
                    /
                    <Link className='PagesCatalogLink' to={"/account/orders"}>Orders</Link>
                </p>
                <p>Seus pedidos</p>
                <Grid container spacing={1}>
                    {orders.map((order: any, index: any) => (
                        <Grid item xs={12} sm={12} md={12} key={index}>
                            <OrderCard cod={order.orderId} date={formatDate(order.createdAt)} status={order.status} />
                            <div>
                            </div>
                        </Grid>
                    )
                    )}

                </Grid>
            </Container>
        </div>
    )
}

export default Orders
