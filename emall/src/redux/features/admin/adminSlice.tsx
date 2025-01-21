import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import {  ORDER,  USER} from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface AdminState {
  allCustomers:USER[] 
  allResellers:USER[] 
  allCustomerServices:USER[] 
  allOrders:ORDER[] 
  allAdmins:USER[] 
  status:  'idle' | 'pending' | 'succeeded' | 'failed'
  error:string | null | undefined
  message:string
  }

  // Define the initial value for the slice state
const initialState: AdminState = {
    allCustomers:  [],
    allResellers: [],
    allCustomerServices: [],
    allOrders: [],
    allAdmins: [],
    status:  'idle',
    error: null ,
    message:"",
  }
  

 // eslint-disable-next-line react-refresh/only-export-components
 const BASEURL = import.meta.env.VITE_APP_BASE_URL
  

export const fetchAdminAllOrders = createAsyncThunk(
    'admin/fetchAdminAllOrders', async () => {
        const response= await axios.get(`${BASEURL}/allorders`,{ withCredentials: true })
        console.log(response.data)
        return response.data
      });

      export const fetchAdminAllCustomers = createAsyncThunk(
        'admin/fetchAdminAllCustomers', async () => {
            const response= await axios.get(`${BASEURL}/allcustomers`,{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
    
          export const fetchAdminAllResellers = createAsyncThunk(
            'admin/fetchAdminAllResellers', async () => {
                const response= await axios.get(`${BASEURL}/allresellers`,{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
        
     
              export const fetchAdminAllCustomerService = createAsyncThunk(
                'admin/fetchAdminAllCustomerService', async () => {
                    const response= await axios.get(`${BASEURL}/allcustomerservices`,{ withCredentials: true })
                    console.log(response.data)
                    return response.data
                  });
            
                 
                  export const fetchAdminAllAdmin = createAsyncThunk(
                    'admin/fetchAdminAllAdmin', async () => {
                        const response= await axios.get(`${BASEURL}/alladmins`,{ withCredentials: true })
                        console.log(response.data)
                        return response.data
                      });
 

  

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAdminAllOrders.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchAdminAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.allOrders= action.payload
      })
      .addCase(fetchAdminAllOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      builder.addCase(fetchAdminAllCustomers.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchAdminAllCustomers.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.allCustomers= action.payload
        })
        .addCase(fetchAdminAllCustomers.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        builder.addCase(fetchAdminAllCustomerService.pending, (state) => {
            state.status = 'pending'
          })
          .addCase(fetchAdminAllCustomerService.fulfilled, (state, action) => {
              state.status = 'succeeded'
              state.allCustomerServices= action.payload
            })
            .addCase(fetchAdminAllCustomerService.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message;
            })
            builder.addCase(fetchAdminAllResellers.pending, (state) => {
                state.status = 'pending'
              })
              .addCase(fetchAdminAllResellers.fulfilled, (state, action) => {
                  state.status = 'succeeded'
                  state.allResellers= action.payload
                })
                .addCase(fetchAdminAllResellers.rejected, (state, action) => {
                  state.status = 'failed'
                  state.error = action.error.message;
                })

                builder.addCase(fetchAdminAllAdmin.pending, (state) => {
                    state.status = 'pending'
                  })
                  .addCase(fetchAdminAllAdmin.fulfilled, (state, action) => {
                      state.status = 'succeeded'
                      state.allAdmins= action.payload
                    })
                    .addCase(fetchAdminAllAdmin.rejected, (state, action) => {
                      state.status = 'failed'
                      state.error = action.error.message;
                    })
        
      
            
       
      
     
  

    
  },
})

// Export the generated action creators for use in components

export const getAdminAllAdmins = (state:RootState) => state.admin.allAdmins
export const getAdminAllCustomers = (state:RootState) => state.admin.allCustomers
export const getAdminAllCustomerService = (state:RootState) => state.admin.allCustomerServices
export const getAdminAllResellers = (state:RootState) => state.admin.allResellers
export const getAdminAllOrders = (state:RootState) => state.admin.allOrders
export const getMessage =(state:RootState) => state.order.message
export const getCheckoutror = (state:RootState) => state.order.error
export const getCheckoutStatus = (state:RootState) => state.order.status


// Export the slice reducer for use in the store configuration
export default adminSlice.reducer;