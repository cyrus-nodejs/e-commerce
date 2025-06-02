 
// import Navbar from "../components/Navbar/Navbar";
// import {Col,  Row, Container, Image,  } from 'react-bootstrap'

//  import {Link} from "react-router-dom";
// import { ITEM } from "../utils/@types";
// const Search = () => {
  
     
     

//   return (
//     <section className="home">
//     <Container fluid>
  
//       <Row>
      
//         <Col sm={2} style={{margin:"40px 0px"}} >
        
//         <Row >
       
//        <Navbar  />
//         </Row>
//         </Col>
//         <Col sm={10} style={{margin:"0px 0px", width:"80%"}} >
//         {searchQuery ? (
//               <div className="p-2 fs-4 fw-bold" style={{borderRadius:"5px", background:"whitesmoke", color:''}}>
//               {searchItems.map((item:ITEM )=>  {
//                 return(
//                 <Row  style={{width: '11.5rem', display:"inline-flex", height:"15rem", margin:"10px"}}>
               
//                    <Col   style={{border:"1px solid white", borderRadius:"10px", width:"11rem", height:"15rem", backgroundColor:"#FFFFFF",}}       >
//                    <center>
//                    <Link to={`/product/${item.title}`} className="p-2 text-decoration-none text-reset"> 
//                    <Image   style={{width:'8rem', height:"10rem" }}  rounded src={item.image} />
//                 <p className="fs-6  text-center  ">{item.title.substring(0, 15) + ".."}</p>
//                 <p className="fs-6 fw-bold  text-center  " >
//                  ${item.price}
//                 </p>
//                 </Link>
//                 </center>
//             </Col>
//             </Row>
//                  )})}
//               </div>
//         ) : (<div className="h1 m-5">No Search Results</div>)}
      
//      </Col>
//       </Row>
//     </Container>
//         </section>
//   )
// }

// export default Search;