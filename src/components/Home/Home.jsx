import React from 'react'
import style from "./Home.module.css"
import RecentProducts from './../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlide from './../MainSlide/MainSlide';

export default function Home() {
  return (
    <>
      <MainSlide />
      <CategoriesSlider />
      <RecentProducts />
    </>
  )
}
