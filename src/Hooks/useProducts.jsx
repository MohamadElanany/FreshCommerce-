import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {

    function getProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }
    
    let productInfo = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getProducts,
        staleTime: 10000, //old after 10 sec
        gcTime: 4000, // delete req after 4 sec 
        select: (data)=> data.data.data,
        // select: (data)=> data.data.data.filter(product.category.name == "elc") // i will use this after
    });

    return productInfo

}
