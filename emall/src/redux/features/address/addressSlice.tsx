import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import axios from 'axios'
import { ADDRESSITEM } from '../../../utils/@types'

export interface AuthState {
  destination:ADDRESSITEM | null | void
    status:  'idle' | 'pending' | 'succeeded' | 'failed'
    error:string | null | undefined
    message:string
  
  }

  // Define the initial value for the slice state
const initialState: AuthState = {
    destination: null ,
    status: 'idle' ,
    error:null,
    message:'',
  }
  // eslint-disable-next-line react-refresh/only-export-components
const BASEURL = import.meta.env.VITE_APP_BASE_URL




      export const fetchAddress = createAsyncThunk(
        'auth/fetchAddress', async () => {
         
            const response= await axios.get(`${BASEURL}/getaddress`,{ withCredentials: true })
            console.log(response.data)
            return response.data
          });

          export const fetchCreateAddress = createAsyncThunk(
            'auth/fetchCreateAddress', async (data:{firstname:string, lastname:string, mobile:string, mobile2:string, address:string, ordernote:string, nation:string,
                 province:string, postalcode:string, region:string}) => {
              const {firstname, lastname, mobile, mobile2, address, ordernote, nation, postalcode, region, province  } = data
                const response= await axios.post(`${BASEURL}/createaddress`, {
                    firstname,lastname, mobile, mobile2, address, ordernote, nation,postalcode, region, province
                },{ withCredentials: true })
                console.log(response.data)
                return response.data
              });

              export const fetchUpdateAddress = createAsyncThunk(
                'auth/fetchUpdateAddress', async (data:{firstname:string, lastname:string, mobile:string, mobile2:string, address:string, ordernote:string, nation:string,
                    province:string, postalcode:string, region:string}) => {
                        const {firstname, lastname, mobile, mobile2, address, ordernote, nation, postalcode, region, province  } = data
                    const response= await axios.post(`${BASEURL}/updateaddress`, 
                        {
                            firstname,lastname, mobile, mobile2, address, ordernote, nation,postalcode, region, province
                        },
                        { withCredentials: true })
                    console.log(response.data)
                    return response.data
                  });
        
        
// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const addressSlice = createSlice({
  name: 'address',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = 'pending'
      
    })
    .addCase(fetchAddress.fulfilled, (state, action) => {
         state.destination= action.payload.address
        
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
        
      })
      builder.addCase(fetchCreateAddress.pending, (state) => {
        state.status = 'pending'
        
      })
      .addCase(fetchCreateAddress.fulfilled, (state, action) => {
           state.message= action.payload.message
           state.status = 'succeeded'
          
        })
        .addCase(fetchCreateAddress.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
          
        })
        builder.addCase(fetchUpdateAddress.pending, (state) => {
            state.status = 'pending'
          })
          .addCase(fetchUpdateAddress.fulfilled, (state, action) => {
            state.message= action.payload.message
            state.status = 'succeeded'
            })
            .addCase(fetchUpdateAddress.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message;
              
            })
      
     
    
  },
})

// Export the generated action creators for use in components
export const getAddress = (state:RootState) => state.address.destination
export const getAddressError = (state:RootState) => state.address.error
export const getAddressStatus = (state:RootState) => state.address.status
export const getMessage =(state:RootState) => state.address.message

// Export the slice reducer for use in the store configuration
export default addressSlice.reducer;