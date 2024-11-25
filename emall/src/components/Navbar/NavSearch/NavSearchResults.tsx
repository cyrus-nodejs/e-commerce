


import { useAppDispatch } from "../../../redux/app/hook";
import { ITEM } from "../../../utils/@types";
import {  Image,   } from "react-bootstrap"



import {  useAppSelector } from "../../../redux/app/hook";

import { fetchSearchResult, getSearchResult,   getSearchTerm } from '../../../redux/features/items/itemSlice'
import { useEffect } from 'react'

const  NavSearchResults = () => {
  const dispatch = useAppDispatch()
  const searchResult = useAppSelector(getSearchResult)
  const searchterm = useAppSelector(getSearchTerm)
 
  useEffect(() =>{
    dispatch(fetchSearchResult(searchterm))
        }, [dispatch, searchterm])
       
    
    console.log(searchResult)
  return (
    
        <div  className="     text-light ">
            {searchResult ? (
          <div>
           <div className="d-flex mb-3">

           <div className="d-inline-flex my-3 fs-4 border-info  border-bottom">Search Results</div>
   
  </div>
        
            <div className="row   ">
       {searchResult?.slice(0, 20).map((item:ITEM) =>{
          return (
        
          
  <div className="position-relative m-2" style={{width:"180px", height:"150px"}} >
                
                <Image src={item.image} width="180" height="150"   rounded />
              
                 <div className="figure-caption text-light  ">{item.title}</div> 
              </div>
              )
       })}



       </div>
      
      
        </div>
         ) : (<div className="fs-1">No Search Results</div>)}
    </div>
    
           
      
  )
}

export default NavSearchResults;