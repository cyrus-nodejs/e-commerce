import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import axios from 'axios'


export interface CheckoutState {
  stripePromise:string  ,
  clientSecret:string,
  status:  'idle' | 'pending' | 'succeeded' | 'failed'
  error:string | null | undefined
  }

  // Define the initial value for the slice state
const initialState: CheckoutState = {
    stripePromise:'',
    clientSecret:'',
    status:  'idle',
    error: null ,
  }
  

 // eslint-disable-next-line react-refresh/only-export-components
 const BASEURL = import.meta.env.VITE_APP_BASE_URL
  
export const fetchConfig = createAsyncThunk(
    'checkout/fetchConfig', async () => {
        const response= await axios.get(`${BASEURL}/config`,{ withCredentials: true })
        console.log(response.data)
        return response.data
      });

  export const fetchCreatePayment = createAsyncThunk(
    'checkout/fetchCreatePayment',  async (data:{gift:number, shipping:number,  cartBills:number}) => {
         const {gift, shipping, cartBills} = data
        const response= await axios.post(`${BASEURL}/create-payment-intent`, {gift, shipping , cartBills}, { withCredentials: true })
        console.log(response.data)
        return response.data
      });

      
// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchConfig.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchConfig.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.stripePromise = action.payload.publishableKey

      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchCreatePayment.pending, (state) => {
      state.status = 'pending'
      })
      .addCase(fetchCreatePayment.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.clientSecret= action.payload.clientSecret
      })
      .addCase(fetchCreatePayment.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      
     
    
  },
})

// Export the generated action creators for use in components
export const getStripePromise = (state:RootState) => state.checkout.stripePromise
export const getClientSecret = (state:RootState) => state.checkout.clientSecret

export const getCheckouterror = (state:RootState) => state.checkout.error
export const getCheckoutStatus = (state:RootState) => state.checkout.status



// Export the slice reducer for use in the store configuration
export default checkoutSlice.reducer;