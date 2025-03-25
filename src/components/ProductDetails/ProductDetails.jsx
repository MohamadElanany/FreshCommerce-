import React, { useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from "react-slick";


export default function ProductDetails() {
  let [product , setProduct] = useState(null);
  let [relatedProducts , setRelatedProducts] = useState([]);
  let {id , category} = useParams();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function getProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res) => {
      setProduct(res.data.data);
    })
    .catch((res) => {
      console.log(res);
    })
  }

  function getAllProduct() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
    .then((res) => {
      let related = res.data.data.filter((product) => product.category.name == category);
      setRelatedProducts(related);
  })
  .catch((res) => {
    console.log(res);
    })
  }

  useEffect(()=>{
    getProduct(id)
    getAllProduct()
  }, [id , category])


  return (
    <>
        <div className="row items-center">
          <div className='w-1/4'>
            {product?.images.length > 1 ? <Slider {...settings}>
              {product?.images.map((src) => <img key={product.id} src={src} className='w-full' alt="product image" /> )}
            </Slider> : <img src={product?.images[0]} className='w-full' alt="product image" />}
            
          </div>
          <div className="w-3/4 p-4">
            <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
            <h4 className='text-gray-700 my-4'>{product?.description}</h4>
            <h4>{product?.category.name}</h4>
            <div className='flex justify-between p-3 my-5'>
                  <span>{product?.price} EGP</span>
                  <span><i className='fas fa-star text-yellow-400'></i> {product?.ratingsAverage}</span>
                </div>
                <button className='btn'>Add To Cart</button>
          </div>
        </div>

        <div className="row">
          { relatedProducts.length > 0 ?  relatedProducts.map((product) => (
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
          )) : <div className="spinner"></div>}
        </div>
    </>
  )
}
