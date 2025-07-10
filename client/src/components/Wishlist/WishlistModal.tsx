/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useContext } from 'react'
import { Image, Button } from 'react-bootstrap'
import { FavoriteContext } from '../../Context/wishlist'
// import { CheckoutContext } from '../../Context/checkout'
import { Link } from 'react-router-dom'
const WishlistModal = () => {
    const {favoriteItems, deleteFromfavorite  } = useContext(FavoriteContext)
  //  const {getOrder} = useContext(CheckoutContext)
    return (
    <div className="">
    
    <div className="row">
        
      {favoriteItems.map((item, id) => (
        <div className="row" key={id}>
            <div className="d-flex">
  <div className="p-2 flex-fill"> <Image src={item.image} width="100px" alt={item.title} className="rounded-md h-24" /></div>
  <div className="p-2 flex-fill">
  <div className="d-flex flex-column mb-3">
  <div className="p-2"><h6 className="text-primary fw-medium">{item.title}</h6></div>
  <div className="p-2"><p className="text-gray-600">${item.price}</p></div>
  
        </div>
        </div>
        <div className="p-2 flex-fill"  onClick={() => {
                deleteFromfavorite(item)
              }}><i className='bx bx-trash'></i></div>
        </div>
        

        </div>
      ))}
      
    </div>
    
    {
      favoriteItems.length < 1 ? (
        <div className="d-flex flex-column mb-3">
  <div className="px-5"><i className='bx bx-unlink display-1 bx-lg'></i></div>
  <div className="p-2"><h1 className="text-lg font-bold"> Wishlist is empty</h1> </div></div>

        
        
         )  : ( 
         <div className="d-grid gap-2">
            
          <Button  className="d-block" variant="outline-info" size="lg">
        <Link  className="text-decoration-none">View Favorites</Link>  
          </Button>
          
          </div>
           )
    
    }
   
  </div>
  )
}

export default WishlistModal