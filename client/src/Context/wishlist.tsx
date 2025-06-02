
import { createContext, useState, useEffect } from 'react'
import { favoriteType, ITEM } from '../utils/@types';
export const FavoriteContext = createContext<favoriteType  >(null!)

export const FavoriteProvider = ({ children}:{ children: React.ReactNode } ) => {
  const [favoriteItems, setFavoriteItems] = useState(localStorage.getItem('favoriteItems') ? JSON.parse(localStorage.getItem('favoriteItems') || '') : [])
  const [state, setState] = useState({
    currency:"$",
  })
    
  const addTofavorite = (item:ITEM) => {
    const isItemInfavorite = favoriteItems.find((favoriteItem:ITEM) => favoriteItem._id === item._id);

    if (isItemInfavorite) {
      setFavoriteItems(
        favoriteItems.map((favoriteItem:ITEM) =>
          favoriteItem._id === item._id
            ? { ...favoriteItem, quantity: favoriteItem.quantity + 1 }
            : favoriteItem
        )
      );
    } else {
      setFavoriteItems([...favoriteItems, { ...item, quantity: 1 }]);
    }
  };

  
  const deleteFromfavorite = (item: ITEM) =>{
    const isItemInCart = favoriteItems.find((favoriteItem:ITEM) => favoriteItem._id === item._id)
    if (isItemInCart) {
      setFavoriteItems(favoriteItems.filter((favoriteItem:ITEM) => favoriteItem._id !== item._id))
    }
  }
  // const removeFromfavorite = (item) => {
  //   const isItemInfavorite = favoriteItems.find((favoriteItem) => favoriteItem.id === item.id);

  //   if (isItemInfavorite.quantity === 1) {
  //     setFavoriteItems(favoriteItems.filter((favoriteItem) => favoriteItem.id !== item.id));
  //   } else {
  //     setFavoriteItems(
  //       favoriteItems.map((favoriteItem) =>
  //         favoriteItem.id === item.id
  //           ? { ...favoriteItem, quantity: favoriteItem.quantity - 1 }
  //           : favoriteItem
  //       )
  //     );
  //   }
  // };

  // const clearfavorite = () => {
  //   setFavoriteItems([]);
  // };

  // const getfavoriteTotal = () => {
  //   return favoriteItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  useEffect(() => {
    const favoriteItems = localStorage.getItem("favoriteItems");
    if (favoriteItems) {
      setFavoriteItems(JSON.parse(favoriteItems));
    }
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteItems,
        deleteFromfavorite,
        addTofavorite,
        state,
        setState
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};