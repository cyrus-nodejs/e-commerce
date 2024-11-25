
// import { createContext, useState, useEffect } from 'react'
// import axios from "axios";
// import { ITEM, itemType } from '../utils/@types';
// import React from 'react';



// export const ItemContext = createContext<itemType> (null!)
// export const ItemProvider = ({ children}:{ children: React.ReactNode }) => {
//     const [items, setItems] = useState([])
//     const [searchItems, setSearchItems] = useState([])
//     const [searchQuery, setSearchQuery] = useState("")
//     const [relatedItem, setRelatedItem] = useState([])
 

//     const addViewedItem = async (item:ITEM)  => {
//       const itemId = item._id
//       const price = item.price
//       const title = item.title
//       const discount = item.discount
//       const image= item.image
//       try {
//         const { data } = await axios.post(
//           "https://emall-server.onrender.com/vieweditem",
//           {
//           itemId,
//           price,
//           title,
//           discount,
//           image,
//           },
//           {withCredentials: true}
//         );
        
//         const { success, message} = data;
//         if (success) {
          
  
//         console.log(message)
          
//         } else {
//           console.log(message);
          
        
         
//         }
//       } catch (error) {
//         console.log(error)
        
//       }
//     }

//     const getItem = ()  => {

//       const config ={
//         method:"get",
//         url:`https://emall-server.onrender.com/items`, 
//         withCredentials: true, 
//       }
    
      
//       axios(config)
//       .then(response=>{
//       setItems(response.data)
//       })
//       .catch(error => {
//         console.log(error)
//       })
      
//     }
    
   
//     const addRelatedItem = async (item:ITEM)  => {
//       const category = item.category
//       const itemId = item._id
//        console.log(category)
//       try {
//         const { data } = await axios.put(
//           "https://emall-server.onrender.com/relateditem",
//           {
//           category,
//           itemId,
//           },
//           {withCredentials: true}
//         );
        
//         const { success, message, item} = data;
//         if (success) {
//         setRelatedItem(item)
//         localStorage.setItem("relateditem", JSON.stringify(item))
//         } else {
//           console.log(message);
//         }
//       } catch (error) {
//         console.log(error)
        
//       }
//     }

  
   
//     const handleSearch = () => {
//     const config ={
//       method:"get",
//       url:`https://emall-server.onrender.com/search?q=${searchQuery}`,
//     }
  
    
//     axios(config)
//     .then(response=>{
//     setSearchItems(response.data)
//     })
//     .catch(error => {
//       console.log(error)
//     })
    
//     }
  
//     useEffect(() =>{
//     relatedItem
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         }, [relatedItem])
      

//         useEffect(() =>{
//           handleSearch();
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//             }, [searchItems])
          
          

//                 useEffect(() =>{
//                   getItem();
                   
//                     }, [items])


                  
   



// console.log(items)


//     return (
//         <ItemContext.Provider
//           value={{
//            items,
//            searchItems,
//            searchQuery,
//            setSearchItems,
//            setSearchQuery,
//            addViewedItem,
//            addRelatedItem,
        
//           }}
//         >
//           {children}
//         </ItemContext.Provider>
//       );

// }