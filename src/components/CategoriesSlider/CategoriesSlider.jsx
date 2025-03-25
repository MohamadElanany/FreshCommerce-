import React, { useEffect, useState } from 'react'
import style from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";


export default function CategoriesSlider() {

  let [categories, setCategories] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    .then((res) => {
      setCategories(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getCategories();
  } , [])

  return (
    <>
      <h2 className='my-3 capitalize font-semibold text-gray-600'>Shop Popular Categories</h2>
        <Slider {...settings}>
          {categories.map((category) => <div key={category._id}>
            <img src={category.image} className='w-full h-[200px] object-cover' alt={category.name} />
            <h4 className='text-lg'>{category.name}</h4>
          </div>) }
          
        </Slider>
    </>
  )
}
