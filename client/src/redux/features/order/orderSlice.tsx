import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import {  ORDER, ITEM} from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface OrderState {
  allOrders:ORDER[] | null
  gift:number
  shipping:number
  orderDetails: ORDER | null
  orderDetailsItems:ITEM[] | null
  orderItems: ITEM[] | null
  currentOrder:ORDER | null 
  orderinvoice:ORDER | null 
  status:  'idle' | 'pending' | 'succeeded' | 'failed'
  error:string | null | undefined
  message:string
  }

  // Define the initial value for the slice state
const initialState: OrderState = {
    allOrders: null,
    gift:0,
    shipping:5,
    orderDetails:  null,
    orderItems:  null,
    orderDetailsItems: null,
    currentOrder: null ,
    orderinvoice: null,
    status:  'idle',
    error: null ,
    message:"",
  }
  

 // eslint-disable-next-line react-refresh/only-export-components
 const BASEURL = import.meta.env.VITE_APP_BASE_URL
  

export const fetchAllOrders = createAsyncThunk(
    'order/fetchAllOrders', async () => {
        const response= await axios.get(`${BASEURL}/getallorders`,{ withCredentials: true })
        console.log(response.data)
        return response.data
      });

 

   
      export const fetchCurrentOrder = createAsyncThunk(
        'checkout/fetchCurrentOrder',  async () => {
            const response= await axios.get(`${BASEURL}/currentorder`,{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
          
      export const fetchCreateOrder = createAsyncThunk(
        'checkout/fetchCreateOrder',  async (data:{gift:number, shipping:number, clientSecret:string}) => {
            const {gift, shipping, clientSecret} = data
            const response= await axios.post(`${BASEURL}/createorder`, {gift, shipping, clientSecret},{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
        
          
      export const fetchOrderDetails = createAsyncThunk(
        'checkout/fetchOrderDetails',  async (id:string | undefined) => {
            const response= await axios.get(`${BASEURL}/orderdetails/${id}`,{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
        
        
export const fetchConfirmPayment = createAsyncThunk(
'checkout/fetchConfirmPayment',  async (paymentIntent) => {
const response= await axios.get(`${BASEURL}/confirmpayment/${paymentIntent}`, { withCredentials: true })
console.log(response.data)
return response.data
});
    
export const fetchRetrievePayment = createAsyncThunk(
 'checkout/fetchRetrievePayment',  async (data:{orderId:string}) => {
const {orderId} = data
const response= await axios.post(`${BASEURL}/retrievepayment`, {orderId},{ withCredentials: true })
console.log(response.data)
return response.data
});               
            


// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addGiftWrap: (state) => {
        state.gift  = 5
       }
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.allOrders= action.payload.order
        state.orderItems = action.payload.order.items

      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchCurrentOrder.pending, (state) => {
      state.status = 'pending'
      })
      .addCase(fetchCurrentOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentOrder= action.payload.order
        state.message = action.payload.message
      })
      .addCase(fetchCurrentOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchConfirmPayment.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchConfirmPayment.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.orderinvoice= action.payload.order
          state.message = action.payload.message
        })
        .addCase(fetchConfirmPayment.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })

 .addCase(fetchCreateOrder.pending, (state) => {
state.status = 'pending'
 })
.addCase(fetchCreateOrder.fulfilled, (state, action) => {
state.status = 'succeeded'
state.message = action.payload.message
})
.addCase(fetchCreateOrder.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchOrderDetails.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchOrderDetails.fulfilled, (state, action) => {
state.status = 'succeeded'
state.orderDetails = action.payload.order
state.orderDetailsItems = action.payload.order.items
state.message = action.payload.message
})
.addCase(fetchOrderDetails.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
}).addCase(fetchRetrievePayment.pending, (state) => {
    state.status = 'pending'
    })
.addCase(fetchRetrievePayment.fulfilled, (state, action) => {
state.status = 'succeeded'
state.message = action.payload.message
})
.addCase(fetchRetrievePayment.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message
})
            
       
      
     
  

    
  },
})

// Export the generated action creators for use in components
export const getGift  = (state:RootState) => state.order.gift
export const getShipping = (state:RootState) => state.order.shipping
export const getAllOrder = (state:RootState) => state.order.allOrders
export const getMessage =(state:RootState) => state.order.message
export const getCurrentOrder = (state:RootState) => state.order.currentOrder
export const getOrderDetailsItems  = (state:RootState) => state.order.orderDetailsItems
export const getOrderDetails = (state:RootState) => state.order.orderDetails
export const getOrderItems = (state:RootState) => state.order.orderItems
export const getOrderInvoice = (state:RootState) => state.order.orderinvoice
export const getCheckoutror = (state:RootState) => state.order.error
export const getCheckoutStatus = (state:RootState) => state.order.status


export const {addGiftWrap} = orderSlice.actions  
// Export the slice reducer for use in the store configuration
export default orderSlice.reducer;