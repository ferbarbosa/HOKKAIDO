import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

interface Props {
  cod: string;
  status: string;
  date: string;
};

const OrderCard: React.FC<Props> = ({ cod, status, date }) => {
  return (
    <Card sx={{ width: '100%', border: '1px solid #e0e0e0', }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '10px',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000',
              margin: '5px',
            }}
          >
            Data do pedido:
          </p>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000',
              margin: '5px',
            }}>
            {date}
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000',
              margin: '5px',
            }}
          >
            Status: 
            <span
              style={{
                color: {'Waiting Confirmation': 'yellow', 'In transit': 'yellow', 'Delivered': 'green', 'Canceled' : 'red'}[status],
              }}
            >
                {status}
            </span>
          </p>

        </div>
        <div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000',
              margin: '5px',
            }}
          >
            Cod do pedido:
          </p>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000',
              margin: '5px',
            }}>
            {cod}
          </p>

        </div>
      </div>
      <p>Cod: {cod}</p>
      <p>Status: {status}</p>

      <p>See details</p>
    </Card>
  )
}

export default OrderCard;
