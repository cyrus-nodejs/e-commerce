
import { useNavigate } from 'react-router-dom';

 import { Image} from 'react-bootstrap';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import {Link} from "react-router-dom";
import { JSXElementConstructor, ReactElement, ReactNode, useContext } from 'react';
import { ItemContext } from '../../Context/items';


const NavbarSearch = () => {
    
    
  const {items} = useContext(ItemContext)
  
  const navigate = useNavigate()
  


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
  
    // const handleOnFocus = () => {
    //   console.log('Focused')
    // }
  
    const formatResult = (item: { title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | null | undefined; image: unknown; }) => {
      return (
        <>
         <Link to={`/product/${item.title}`} className="p-2 text-decoration-none text-reset"> 
        <span className="me-3" style={{ display: 'flex', textAlign: 'left' }}><span ><Image src={`http://localhost:3000/items/${item.image}`} className="ms-3" width="25" height="25"/> </span>{item.title}</span></Link>
        </>
      )
    }

  return (


        <div style={{ width: 400,  }}>
          <ReactSearchAutocomplete
          fuseOptions={{ keys: ["title"] }}
            resultStringKeyName="title"
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
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