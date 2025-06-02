
// import {  Image, Button } from 'react-bootstrap'
// import { useContext } from 'react'
// import { FavoriteContext } from '../../Context/wishlist'
// import { CartContext } from '../../Context/cart'
// import "./wishlist.css"
// const Wishlist = () => {
//     const {favoriteItems, deleteFromfavorite} = useContext(FavoriteContext)
//     const {addToCart } = useContext(CartContext)
//     return (
//         <div className="p-5">
//     <h1 className="tetx-decoration-underline ">Your wishlist</h1>
//         <div className="row">
            
//           {favoriteItems.map((item, id) => (
            
//                 <div class="d-flex flex-column" style={{width:"200px", margin:"20px" }}>
//       <div class=" "> <Image src={item.image} width="150px" alt={item.title} className="rounded-md h-24" /></div>
//       <div class=" ">
//       <div class="d-flex flex-column mb-3">
//       <div class=""><h6 className="text-primary fw-medium">{item.title}</h6></div>
//       <div class=""><p className="fw-medium">${item.price}</p></div>
//       <a className="text-decoration-none text-black" href="/wishlist">
//       <div className="d-grid gap-2">
           
//           <Button size="sm" onClick={() => addToCart(item)}   className="d-block" variant="outline-info">Add to cart</Button>
          
//           </div>
//           </a>
//             </div>
//             </div>
         
//             </div>
            
    
            
//           ))}
         
//         </div>
        
//         {
//           favoriteItems.length < 1 && ( <h1 className="text-lg font-bold"> Wishlist is empty</h1> )  
        
//         }
       
//       </div>
// )
  
// }

// export default Wishlist