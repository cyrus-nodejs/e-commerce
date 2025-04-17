
import { useNavigate } from 'react-router-dom';

 import { Image} from 'react-bootstrap';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useEffect } from 'react';
import {Link} from "react-router-dom";

import { fetchAllItems, getAllItems } from '../../redux/features/items/itemSlice';


import { useAppSelector, useAppDispatch } from '../../redux/app/hook';

const NavbarSearch = () => {
    const dispatch = useAppDispatch()
    const allItems = useAppSelector(getAllItems)
 
    useEffect(() =>{
      dispatch(fetchAllItems())
      
        }, [dispatch])
        
  
  const navigate = useNavigate()
  
  console.log(allItems)

    const handleOnSearch = (searchQuery: unknown, results: unknown) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      console.log(searchQuery, results)
    }
  
    const handleOnHover = (result: unknown) => {
      // the item hovered
      console.log(result)
    }
  
    const handleOnSelect = (item: { title: unknown; }) => {
   navigate(`/product/${item.title}`)
    }
  
    const handleOnFocus = () => {
      console.log('Focused')
    }
  
    const formatResult = (item: { title: string ; image: string; }) => {
      return (
        <>
         <Link to={`/product/${item.title}`} className="p-2 text-decoration-none text-reset"> 
        <span className="me-3" style={{ display: 'flex', textAlign: 'left' }}><span ><Image src={item.image} className="ms-3" width="25" height="25"/> </span>{item.title}</span></Link>
        </>
      )
    }

  return (


        <div style={{ width: 400,  }}>
          <ReactSearchAutocomplete
          fuseOptions={{ keys: ["title"] }}
            resultStringKeyName="title"
            items={allItems}
             onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            maxResults={5}
            styling={{fontSize: "11px", borderRadius:"5px"}}
            showIcon={false}
            placeholder='Search products'
          />
        </div>
    
  )
}

export default NavbarSearch;