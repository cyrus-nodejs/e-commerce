import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import { ITEM } from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface AuthState {
    cartItems: null | ITEM[] | undefined
    cartBills: number 
    status:  'idle' | 'pending' | 'succeeded' | 'failed'
    error:string | null | undefined
    message:string

  }

  // Define the initial value for the slice state
const initialState: AuthState = {
   cartItems:null,
   cartBills:0,
    message:"",
    status: 'idle' ,
    error:null
  }
  
 // eslint-disable-next-line react-refresh/only-export-components
 const BASEURL = import.meta.env.VITE_APP_BASE_URL
  


export const fetchCart = createAsyncThunk(
    'cart/fetchCart', async () => {
        const response= await axios.get(`${BASEURL}/getcart`, { withCredentials: true })
        console.log(response.data)
        return response.data
      });

      export const fetchAddCart = createAsyncThunk(
        'cart/fetchLogin', async (data:{_id:string}) => {
         const  itemId = data._id
            const response= await axios.post(`${BASEURL}/addtocart`,{itemId},{ withCredentials: true })
            console.log(response.data)
            return response.data
          });

          export const fetchReduceCartQTY = createAsyncThunk(
            'cart/fetchReduceCartQty', async (data:{_id:string}) => {
                const  itemId = data._id
                const response= await axios.post(`${BASEURL}/reducecart`, {itemId},{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
        

  export const fetchAddCartQty = createAsyncThunk(
    'cart/fetchAddCartQty',  async (data:{_id:string}) => {
        const  itemId = data._id
        const response= await axios.post(`${BASEURL}/addcart`,{itemId},{ withCredentials: true })
        console.log(response.data)
        return response.data
      });
      export const fetchDeleteFromCart = createAsyncThunk(
        'cart/fetchDeleteFromCart',  async (data:{_id:string}) => {
            const  itemId = data._id
            const response= await axios.post(`${BASEURL}/deletecart`,{itemId},{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
          export const fetchClearCart = createAsyncThunk(
            'cart/fetchClearCart',  async () => {
              const response= await axios.get(`${BASEURL}/clearcart`,{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
            

     
         
// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCart.pending, (state) => {
      state.status = 'pending'
      
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
         state.cartItems= action.payload.cart.items
         state.cartBills = action.payload.cart.bill
        
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
        
      })
      .addCase(fetchAddCart.pending, (state) => {
      state.status = 'pending'
     
      
      })
      .addCase(fetchAddCart.fulfilled, (state, action) => {
        state.message = action.payload.message
      state.status = 'succeeded'
      })
      .addCase(fetchAddCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchReduceCartQTY.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchReduceCartQTY.fulfilled, (state, action) => {
             state.message = action.payload.message
      state.status = 'succeeded'
          
          
        })
        .addCase(fetchReduceCartQTY.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(fetchAddCartQty.pending, (state) => {
      state.status = 'pending'
     
      })
      .addCase(fetchAddCartQty.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message= action.payload.message
      })
      .addCase(fetchAddCartQty.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchDeleteFromCart.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchDeleteFromCart.fulfilled, (state, action) => {
          state.status = 'succeeded'
         
          state.message = action.payload.message
        })
        .addCase(fetchDeleteFromCart.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
          
          
        })
        .addCase(fetchClearCart.pending, (state) => {
          state.status = 'pending'
          })
          .addCase(fetchClearCart.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.message= action.payload.message
          })
          .addCase(fetchClearCart.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
            
          })
     
    
  },
})

// Export the generated action creators for use in components

export const getCartItems = (state:RootState) => state.cart.cartItems
export const getCartBills = (state:RootState) => state.cart.cartBills
export const getAuthError = (state:RootState) => state.cart.error
export const getAuthStatus = (state:RootState) => state.cart.status
export const getMessage =(state:RootState) => state.cart.message

// Export the slice reducer for use in the store configuration
export default cartSlice.reducer;