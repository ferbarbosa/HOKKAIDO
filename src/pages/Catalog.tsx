import React, { useEffect, useState } from 'react'
import ItemCard from "../components/ItemCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion';

import api from "../services/api";

import Divider from '../components/Divider';

import '../styles/catalog.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
    type: string;
}



export const Catalog: React.FC = () => {

    const [products, setProducts] = useState<Array<any>>([]);
    const [pagination, setPagination] = useState<number>(8);
    const [fetched, setFetched] = useState<boolean>(false);
    const [sort, setSort] = useState<string>("createdAt");
    const [orderBy, setOrderBy] = useState<number>(1);
    const [selectedSort, setSelectedSort] = useState<string>("Newest");
    const [loading, setLoading] = useState<boolean>(false);

    const { type } = useParams();

    useEffect(() => {
        setLoading(true);
    }, [type]);

    useEffect(() => {
        if (!fetched) {

            setFetched(true);

            api.get('/catalog?tag=' + type + '&sort=' + sort + '&orderBy=' + orderBy+ '&limit=' + pagination)
                .then(function (response: any) {
                    products.push(response.data);

                    const data = response.data;
                    const receivedProduct = []
                    for (let id in data) {
                        receivedProduct.push(data);
                    }
                    setProducts(receivedProduct);
                    setLoading(false);

                })
                .catch(function (error: any) {
                    console.log(error);
                })
        }

        return () => {
            setFetched(false);
        }


    }, [products, pagination, type, sort, orderBy]);

    const paginate = () => {
        if (pagination <= products.length) {
            setPagination(pagination + 4);
        }

    };

    const changeSorting = (sort: string, order: number, selected: string) => {
        setSort(sort);
        setOrderBy(order);
        setSelectedSort(selected)
    };

    return (
        <div className='ProductContainer'>
            <Container maxWidth="lg">

                <p>
                    <Link className='PagesCatalogLink' to="/">HOME</Link>
                    /
                    <Link className='PagesCatalogLink' to={"/catalog/" + type}>{type}</Link>
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
                                    <button >T-Shirt</button>
                                    <button >Shirt</button>
                                    <button >Skirt</button>
                                    <button >Shoes</button>
                                    <button >Jeans</button>
                                    <Link to="/catalog/dress">dress</Link>
                                </div>
                            </div>

                            <div className="dropdown">
                                <button className="dropbtn"><a className='DropdownText'>Color</a> <KeyboardArrowDownIcon /></button>
                                <div className="dropdown-content">
                                    <Link to="/catalog/white">white</Link>
                                    <button >Black</button>
                                    <button >Red</button>
                                    <button >Yellow</button>
                                    <button >Green</button>
                                    <button >Blue</button>
                                    <button >Purple</button>
                                </div>
                            </div>

                        </div>

                        <div>

                            <div className="dropdown">
                                <button className="dropbtn"><a className='DropdownText'>{selectedSort}</a> <KeyboardArrowDownIcon /></button>
                                <div className="dropdown-content">
                                    <a href="#">Sale</a>
                                    <button onClick={() => changeSorting("createdAt", 1, "Newest")}>Newest</button>
                                    <button onClick={() => changeSorting("createdAt", -1, "Oldest")}>Oldest</button>
                                    <button onClick={() => changeSorting("price", 1, "Lowest price")}>Lowest price</button>
                                    <button onClick={() => changeSorting("price", -1, "Highest price")}>Highest price</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Divider color="#bbb" size={0.5} type="solid" />
                </div>

                <Grid
                    container spacing={1} justifyContent="center"
                >
                    {
                        !products.length || loading ?
                            <div
                                className="LoadingArea"
                            >
                                <motion.span
                                    className="loadingCircle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                >
                                </motion.span>
                                <motion.span
                                    className="loadingCircle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.05 }}
                                >
                                </motion.span>
                                <motion.span
                                    className="loadingCircle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.1 }}
                                >
                                </motion.span>
                            </div>
                            :
                            products.filter((product, index) => index < pagination).map((product, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Link to={'/product/' + product[index].itemId} style={{ textDecoration: 'none' }} >
                                        <motion.div
                                            key={type}
                                            initial={{ opacity: 0.2 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.9 }}
                                        >
                                            <ItemCard
                                                name={product[index].title}
                                                cover={product[index].img[0]}
                                                price={product[index].price}
                                            />
                                        </motion.div>
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
