import { fetchAllItems, getAllItems } from "../../redux/features/items/itemSlice"
import { getAuthUser,  fetchAsyncUser } from "../../redux/features/auth/authSlice"
import { useAppSelector, useAppDispatch } from "../../redux/app/hook"
import { useEffect } from "react"
import { fetchAddRecentlyViewed } from "../../redux/features/items/itemSlice"
import { Spinner, Button, Image, Col,  Row, } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ITEM } from "../../utils/@types"

import { fetchDeleteItem } from "../../redux/features/items/itemSlice"


const AllProducts = () => {
const dispatch = useAppDispatch()
const allItems = useAppSelector(getAllItems)
// const isAuthenticated = useAppSelector(getIsAuthenticated)
const authUser = useAppSelector(getAuthUser)
 
useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])
  
      useEffect(() =>{
        dispatch(fetchAllItems())
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [dispatch])
      
  
  return (
    <Row  className='' >
    {allItems && allItems.length > 0  ? (<div>
      <div>
  <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">All Products</div>
</div>
    <div  className="row">

{allItems?.map((items:ITEM, id) =>{
 return (
   <Col key={id} className=" d-flex  flex-column position-relative  mb-3" style={{width:"200px", }}>
   <Link onClick={() =>{dispatch(fetchAddRecentlyViewed(items)) }}  to={`/product/${items.title}`} className="p-2 text-decoration-none text-reset"> <Image src={items.image}  width="150px" height="200px"  className=""  /></Link> 
    <div className="d-flex flex-column ">
     <div className="text-primary fw-medium">{items.title.substring(0, 25)}</div>
    {/* <div className="d-inline-flex gap-1 text-dark fs-6">{items.rating}{items.review}</div> */}
    <div className="fw-bold ">${items.price}</div> 
    <div className="top-left  fw-bold rounded-1 px-2 text-light bg-info ">{items.status}</div> 
   {/* < div className="top-left  fw-bold rounded-1 px-2 text-light bg-success ">{items.discount}</div>  */}
     
 
   {authUser?.role === 'admin' &&  (    <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => dispatch(fetchDeleteItem(items))}   className="d-block" variant="dark">Delete Item</Button></div> )}   
       
       
   {authUser?.role === 'customer service' &&  (    <div className="text-center  d-grid gap-2"><Link className="text-decoration-none" to={`/update/item/${items._id}`}><Button size="sm"   className="d-block" variant="dark">Update Item</Button></Link></div> )}   
     

     </div>
     
     </Col>
     )
})}

</div>

    </div>):(<div className="fs-4 text-center"><Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner> <p className="fs-4 text-center">Refresh Page</p> </div>)}
   
   
   
  
</Row>
  )
}

export default AllProducts