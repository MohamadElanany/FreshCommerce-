import React, { useEffect , useState } from 'react'
import style from "./RecentProducts.module.css"
import { Link } from 'react-router-dom';
import useProducts from './../../Hooks/useProducts';


export default function RecentProducts() {

  let {data, isError, isLoading, error} = useProducts()

  if(isError){
    return <h3>{error}</h3>
  }

  if(isLoading){
    return <div className="spinner"></div>
  }

  return (
    <>
        <div className="row">
          {data.map((product) => (
            <div key={product.id} className='w-1/6'>
              <div className="product my-2 p-2">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className='w-full' alt="product image" />
                <h3 className='text-emerald-600'>{product.category.name}</h3>
                <h3 className='font-semibold mb-1'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                <div className='flex justify-between p-3'>
                  <span>{product.price} EGP</span>
                  <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
                </div>
              </Link>
                <button className='btn'>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
    </>
  )
}
