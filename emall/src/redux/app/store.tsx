
import { configureStore} from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit'
 import  authReducer  from '../features/auth/authSlice'
import addressReducer from '../features/address/addressSlice'
import cartReducer from "../features/cart/cartSlice"
import checkoutReducer from "../features/checkout/checkoutSlice"
import itemsReducer from "../features/items/itemSlice"
import orderReducer from "../features/order/orderSlice"
import adminReducer from "../features/admin/adminSlice"



export const store = configureStore({
  reducer: {
    auth:authReducer,
    address:addressReducer,
    cart:cartReducer,
    checkout:checkoutReducer,
    items:itemsReducer,
    order:orderReducer,
    admin:adminReducer,
   
  }
})



// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>