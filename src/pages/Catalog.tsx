import React, {useEffect, useState} from 'react'
import ItemCard from "../components/ItemCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import api from "../services/api";

import Divider from '../components/Divider';

import '../styles/catalog.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
    type: string;
}

export const Catalog: React.FC<Props>  = ({type}) => {

    const [products, setProducts] = useState<Array<any>>([]);
    const [pagination, setPagination] = useState<number>(4)

    useEffect(() => {
        api.get('/items/tag/'+type)
        .then(function (response:any) {
            products.push(response.data);

            const data = response.data;
            const receivedProduct = []
            for(let id in data){
               receivedProduct.push(data);
            }
            setProducts(receivedProduct);
            
        })
        .catch(function (error:any) {
          console.log(error);
        })
      }, [products || pagination])

    const paginate = () => {
        if(pagination <= products.length){
            setPagination(pagination+4);
        }
        
    };

    return (
        <div className='ProductContainer'>
                <Container maxWidth="lg">

                    <p>
                        <Link className='PagesCatalogLink' to="/">HOME</Link> 
                        / 
                        <Link className='PagesCatalogLink' to={"/catalog/"+type}>{type}</Link>
                    </p>

                    <div className="CatalogOptions">

                        <Divider color="#bbb" size={0.5} type="solid" />
                        <div className="FilterCatalog">
                            <div>
                                <div className="dropdown">
                                    <button className="dropbtn"><a className='DropdownText'>Size</a> <KeyboardArrowDownIcon /></button>
                                    <div className="dropdown-content">
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="P" />
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="M" />
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="G" />
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="GG" />
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="XG" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="dropdown">
                                    <button className="dropbtn"><a className='DropdownText'>Type</a> <KeyboardArrowDownIcon /></button>
                                    <div className="dropdown-content">
                                        <a href="#">T-Shirt</a>
                                        <a href="#">Shirt</a>
                                        <a href="#">Skirt</a>
                                        <a href="#">Shoes</a>
                                        <a href="#">Jeans</a>
                                        <a href="#">Dress</a>
                                    </div>
                                </div>

                                <div className="dropdown">
                                    <button className="dropbtn"><a className='DropdownText'>Color</a> <KeyboardArrowDownIcon /></button>
                                    <div className="dropdown-content">
                                        <a href="#">White</a>
                                        <a href="#">Black</a>
                                        <a href="#">Red</a>
                                        <a href="#">Yellow</a>
                                        <a href="#">Green</a>
                                        <a href="#">Blue</a>
                                    </div>
                                </div>

                            </div>

                            <div>

                                <div className="dropdown">
                                    <button className="dropbtn"><a className='DropdownText'>Newest</a> <KeyboardArrowDownIcon /></button>
                                    <div className="dropdown-content">
                                        <a href="#">Sale</a>
                                        <a href="#">Lowest price</a>
                                        <a href="#">Highest price</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Divider color="#bbb" size={0.5} type="solid" />
                    </div>

                    <Grid   
                        container spacing={1}
                    >
                        { 
                            products.filter((product, index) => index < pagination).map((product,index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Link to={'/product/'+product[index].itemId} style={{ textDecoration: 'none' }} >
                                        <ItemCard 
                                            name={product[index].title} 
                                            cover={product[index].img[0]} 
                                            price={product[index].price} 
                                        />
                                    </Link>
                                </Grid>
                            ))
                        }

                    </Grid>
                    <div className="PaginationArea">
                        <button className="PaginationButton" onClick={paginate}>Load More</button>
                    </div>
                </Container>
        </div>
    )
}

export default Catalog;
