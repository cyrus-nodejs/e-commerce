



import { useAppDispatch, useAppSelector } from '../../../redux/app/hook'
import { fetchSearchResult, handleSearchterm, getSearchTerm } from '../../../redux/features/items/itemSlice'
import { Form } from 'react-bootstrap'
import { useEffect } from 'react'
const NavSearch = () => {
  const searchterm = useAppSelector(getSearchTerm)
  const dispatch = useAppDispatch()
   

useEffect(() =>{
  dispatch(fetchSearchResult(searchterm))
      }, [dispatch, searchterm])
       
     
  return (
    <div className="d-block " >
        {/* <a href="/">
          <div className="">
          {/* <i className='bx bx-home  bx-sm text-light'></i> */}
          {/* </div>
          </a>
        <div className="p-2   "> */} 
<Form.Control  onChange = {(e) => dispatch(handleSearchterm(e.target.value))}  type="text" className="text-dark shadow-none border border-0   rounded-2  shadow-none " placeholder="Search Products" />
{/* </div>  */}


    </div>
  )
}

export default NavSearch