import React, {useEffect, useState} from 'react'

import api from "../services/api";

interface Props {
    type: string;
}

export const Catalog: React.FC<Props>  = ({type}) => {

    const [products, setProducts] = useState<Array<any>>([]);

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
      }, [products])

    return (
        <div>
        { 
            products.map((product,index) => (
                <div>
                    <h1>{product[index].title}</h1>
                    <img src ={product[index].img[0]}/>
                    <a>{product[index].price}</a>
                </div>
            ))
        }
        </div>
    )
}

export default Catalog;
