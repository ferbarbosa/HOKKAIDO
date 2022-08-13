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
  children: any;
};

const OrderCard: React.FC<Props> = ({ cod, status, date, children }) => {
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
              color: 'rgba(0, 0, 0, 0.5)',
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
          >Status:</p>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000',
              margin: '5px',
            }}
          >
            <span
              style={{
                color: {'Waiting Confirmation': 'orange', 'In transit': 'orange', 'Delivered': 'green', 'Canceled' : 'red'}[status],
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
              color: 'rgba(0, 0, 0, 0.5)',
              margin: '5px',
            }}>
            {cod}
          </p>

        </div>
      </div>

      {children}
    </Card>
  )
}

export default OrderCard;
