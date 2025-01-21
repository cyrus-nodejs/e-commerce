import { fetchAdminAllResellers, getAdminAllResellers } from "../../redux/features/admin/adminSlice"
import { getAuthUser,  fetchAsyncUser } from "../../redux/features/auth/authSlice"
import { useAppSelector, useAppDispatch } from "../../redux/app/hook"
import { useEffect } from "react"
import { Spinner, Button, Image, Col,  Row, } from "react-bootstrap"

import { USER} from "../../utils/@types"



const AllResellers = () => {
const dispatch = useAppDispatch()
const allResellers = useAppSelector(getAdminAllResellers)
// const isAuthenticated = useAppSelector(getIsAuthenticated)
const authUser = useAppSelector(getAuthUser)
 console.log(allResellers)
useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])
  
      useEffect(() =>{
        dispatch(fetchAdminAllResellers())
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [dispatch])
      
  
  return (
    <Row  className='' >
    {allResellers && allResellers.length > 0  ? (<div>
      <div>
  <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">All Resellers</div>
</div>
    <div  className="row">

{allResellers?.map((items:USER, id) =>{
 return (
   <Col key={id} className=" d-flex  flex-column position-relative  mb-3" style={{width:"200px", }}>
    <Image src='https://img.freepik.com/premium-photo/ai-generated-images-build-user-profile-page_1290175-101.jpg' alt={items.firstname}  width="150px" height="200px"  className=""  />
    <div className="d-flex flex-column ">
     <div className="text-primary fw-medium">{items.firstname.toUpperCase()} {items.lastname.toUpperCase()}</div>
    {/* <div className="d-inline-flex gap-1 text-dark fs-6">{items.rating}{items.review}</div> */}
    <div className="fw-bold ">{items.email}</div> 
    <div className='fw-bold'>{items.role}</div>
    <div className='fw-bold'>Joined: {items.register_date}</div>
    

     
   {authUser?.role === 'admin' &&  (    <div className="text-center d-grid gap-2"><Button size="sm"    className="" variant="dark">Delete User</Button></div> )}   
       
         
     

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

export default AllResellers