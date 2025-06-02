import { fetchAdminAllAdmin, getAdminAllAdmins } from "../../redux/features/admin/adminSlice"
import { getAuthUser,  fetchAsyncUser } from "../../redux/features/auth/authSlice"
import { useAppSelector, useAppDispatch } from "../../redux/app/hook"
import { useEffect } from "react"
import { Spinner, Button,  Col,  Row, } from "react-bootstrap"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { USER} from "../../utils/@types"



const AllAdmins = () => {
const dispatch = useAppDispatch()
const allAdmins = useAppSelector(getAdminAllAdmins)
// const isAuthenticated = useAppSelector(getIsAuthenticated)
const authUser = useAppSelector(getAuthUser)
 
useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])
  
      useEffect(() =>{
        dispatch(fetchAdminAllAdmin())
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [dispatch])
      
  
  return (
    <Row  className='' >
    {allAdmins && allAdmins.length > 0  ? (<div>
      <div>
  <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">All Admin Personels</div>
</div>
    <div  className="row">

{allAdmins?.map((items:USER, id) =>{
 return (
   <Col key={id} className=" d-flex  flex-column position-relative  mb-3" style={{width:"200px", }}>
  <LazyLoadImage effect="blur" src={'https://img.freepik.com/premium-photo/ai-generated-images-build-user-profile-page_1290175-101.jpg'}  style={{ width: '130px', height: '130px' }}  className="" />
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

export default AllAdmins