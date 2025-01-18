import {Row } from "react-bootstrap"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CATEGORY } from "../../../utils/@types";
import Product from "./Product";
import Nextrrow from "../Trending/Nextrrow";
import Previosarrow from "../Trending/Previosarrow";
import {  useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hook";
import { fetchCategory, getCategory } from "../../../redux/features/items/itemSlice";
const Categories = () => {

  const dispatch = useAppDispatch()

  const settings = {
    infinite: false,

    speed: 0,
    nextArrow:<Nextrrow className={undefined} style={undefined} onClick={undefined} />,
    prevArrow:<Previosarrow className={undefined} style={undefined} onClick={undefined} />,
    initialSlide: 0,
    // slidesToShow: screenType === "MOBILE" ? 1 :"5" ,
    // slidesToScroll: screenType === "MOBILE" ? 6 : "6",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 6,
          infinite: true,
          
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 6,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 6,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 6,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
     
    useEffect(() =>{
  dispatch(fetchCategory())
  
    }, [dispatch])
    const category = useAppSelector(getCategory)
    console.log(category)
  return (
    <Row className="my-3">
{category && category.length > 0  ?  (<div><div className="mb-4">
      <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Popular Categories</div>
    </div>
    
    <div className="slider-container  ">
    <Slider {...settings}>
    {category?.map((product:CATEGORY)=> <Product  product={product}/>   )}
    </Slider>
    </div></div>) : (<div className="fs-4 my-2 text-center"></div>)}
      
    </Row>
  )
}

export default Categories