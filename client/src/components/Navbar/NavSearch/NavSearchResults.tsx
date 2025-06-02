
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



import { useAppDispatch } from "../../../redux/app/hook";
import { ITEM } from "../../../utils/@types";
import {   Col,   } from "react-bootstrap"
import { Link } from 'react-router-dom';
import { FavoriteContext } from '../../../Context/wishlist';

import {  useAppSelector } from "../../../redux/app/hook";

import { fetchSearchResult, getSearchResult,   getSearchTerm } from '../../../redux/features/items/itemSlice'
import { useEffect, useContext} from 'react'

const  NavSearchResults = () => {
  const dispatch = useAppDispatch()
  const searchResult = useAppSelector(getSearchResult)
  const searchterm = useAppSelector(getSearchTerm)
 const {state} = useContext(FavoriteContext)
  useEffect(() =>{
    dispatch(fetchSearchResult(searchterm))
        }, [dispatch, searchterm])
       
    
    console.log(searchResult)
  return (
    
        <div  className="     text-light ">
            {searchResult ? (
          <div>
           <div className="d-flex mb-3">

           <div className="d-inline-flex my-3 fs-4 border-info text-dark  border-bottom">Search Results</div>
   
  </div>
        
            <div className="row   ">
       {searchResult?.slice(0, 5).map((item:ITEM) =>{
          return (
            <Col  key={item._id} style={{width:"150px"}}>
               
           <Link to={`/product/${item.title}`}  className="p-2 text-decoration-none text-reset">   </Link>
           <LazyLoadImage   width="150px" height="200px"   effect="blur"  src={item.image} />
        <p className="fs-6  text-dark  ">{item.title.substring(0, 10) + ".."}</p>
        <p className="fs-6 fw-bold  text-dark " >
         {state.currency}{item.price}
        </p>
       
    </Col>
          

              )
       })}



       </div>
      
      
        </div>
         ) : (<div className="fs-1">No Search Results</div>)}
    </div>
    
           
      
  )
}

export default NavSearchResults;