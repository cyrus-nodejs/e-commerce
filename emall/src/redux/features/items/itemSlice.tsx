import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import { ITEM, CATEGORY } from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface AuthState {

    allItems:ITEM[] 
    category : CATEGORY[] 
    categoryDetails : ITEM[] 
    topdeals : ITEM[] 
    flashdeals : ITEM[] 
    trending : ITEM[] 
    searchTerm:string | null
    searchResult : ITEM[] | null
    recommended : ITEM[] 
    topFeaturedGallery : ITEM[]
    topFeaturedSlide : ITEM[]
    clearance : ITEM[]
    relatedItems : ITEM[]
    productDetails: ITEM[] | null
    getItembyId:object | ITEM
    recentlyViewed: ITEM[]
    searchItems: ITEM[] | null
    searchQuery: string
    status:  'idle' | 'pending' | 'succeeded' | 'failed'
    error:string | null | undefined
    message:string
    
  }

  // Define the initial value for the slice state
const initialState: AuthState = {

    category : [],
    categoryDetails :[],
    topdeals : [],
    flashdeals :  [],
    trending :  [],
    recommended :  [],
    topFeaturedGallery :  [],
    topFeaturedSlide : [],
    relatedItems : [],
    searchTerm:'',
    searchResult:[],
    allItems:[] ,
    getItembyId:{},
    clearance :  [],
    productDetails:null,
    recentlyViewed:[],
    searchItems: null,
    searchQuery: '',
    message:"",
    status: 'idle' ,
    error:null
  }
  //eslint-disable-next-line react-refresh/only-export-components
    const BASEURL = import.meta.env.VITE_APP_BASE_URL
console.log(BASEURL)
 

  
export const fetchAddRecentlyViewed = createAsyncThunk(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'items/fetchAddRecentlyViewed', async (item:ITEM) => {
        const itemId = item._id
        const response= await axios.post(`${BASEURL}/addviewed`,{itemId},{ withCredentials: true })
        console.log(response.data)
        return response.data
      });

      export const fetchAddItem = createAsyncThunk(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'items/fetchAddItem', async (data:any) => {
            const response= await axios.post(`${BASEURL}/add/item`,{data},{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
       
        
    
      export const fetchUpdateItem = createAsyncThunk(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'items/fetchUpdateItem', async (data:{id:any, formData:any}) => {
            const {id, formData} = data
            const response= await axios.post(`${BASEURL}/admin/update-item/${id}`,{formData},{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
    

      export const fetchDeleteItem = createAsyncThunk(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'items/fetchDeleteItem', async (item:ITEM) => {
            const itemId = item._id
            const response= await axios.post(`${BASEURL}/admin/delete-item`,{itemId},{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
      
          export const fetchGetItemById= createAsyncThunk(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            'items/fetchGetItemById', async (id:any) => {
                const response= await axios.get(`${BASEURL}/getitem/${id}`,{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
        
      export const fetchRecentlyViewed = createAsyncThunk(
        'items/fetchRecentlyViewed', async () => {
         
            const response= await axios.get(`${BASEURL}/getviewed`,{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
       

          export const fetchGetRelated= createAsyncThunk(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            'items/fetchGetRelated', async (item:any) => {
            const id = item.category
                const response= await axios.get(`${BASEURL}/relateditem/${id}`,{ withCredentials: true })
                console.log(response.data.item)
                return response.data
              });
        

           

  export const fetchCategory = createAsyncThunk(
    'items/fetchCategory',  async () => {
        const response= await axios.get(`${BASEURL}/category`,{ withCredentials: true })
        console.log(response.data)
        return response.data
      });

      export const fetchCategoryDetails = createAsyncThunk(
        'items/fetchCategoryDetails',  async (id:string|undefined) => {
            const response= await axios.get(`${BASEURL}/category/${id}`,{ withCredentials: true })
            console.log(response.data.item)
            return response.data.item
          });
          export const fetchFlashDeals = createAsyncThunk(
            'items/fetchFlashDeals',  async () => {
                const response= await axios.get(`${BASEURL}/flashdeals`,{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
              export const fetchTopDeals = createAsyncThunk(
                'items/fetchTopDeals',  async () => {
                    const response= await axios.get(`${BASEURL}/topdeals`,{ withCredentials: true })
                    console.log(response.data)
                    return response.data
                  });
                  export const fetchTrending = createAsyncThunk(
                    'items/fetchTrending',  async () => {
                        const response= await axios.get(`${BASEURL}/trending`,{ withCredentials: true })
                        console.log(response.data)
                        return response.data
                      });
                      export const fetchRecommended = createAsyncThunk(
                        'items/fetchRecommended',  async () => {
                            const response= await axios.get(`${BASEURL}/recommended`,{ withCredentials: true })
                            console.log(response.data)
                            return response.data
                          });
                          export const fetchTopFeaturedGallery = createAsyncThunk(
                            'items/fetchTopFeaturedGallery',  async () => {
                                const response= await axios.get(`${BASEURL}/topfeaturedgallery`,{ withCredentials: true })
                                console.log(response.data)
                                return response.data
                              });
                              export const fetchTopFeaturedSlide = createAsyncThunk(
                                'items/fetchTopFeaturedSlide',  async () => {
                                    const response= await axios.get(`${BASEURL}/topfeaturedslide`,{ withCredentials: true })
                                    console.log(response.data)
                                    return response.data
                                  });
                                   export const fetchClearance = createAsyncThunk(
                                'items/fetchClearance',  async () => {
                                    const response= await axios.get(`${BASEURL}/clearance`,{ withCredentials: true })
                                    console.log(response.data)
                                    return response.data
                                  });
                                  export const fetchProductDetails = createAsyncThunk(
                                    'items/fetchProductDetails',  async (id:string | undefined) => {
                                    
                                const response= await axios.get(`${BASEURL}/itemdetails/${id}`,{ withCredentials: true })
                                        console.log(response.data)
                                        return response.data
                                      });
                                      export const fetchAllItems = createAsyncThunk(
                                        'items/fetchAllitems', async () => {
                                            const response= await axios.get(`${BASEURL}/allitems`, { withCredentials: true })
                                            console.log(response.data)
                                            return response.data
                                          });
                                      export const fetchSearchTerm = createAsyncThunk(
                       
                                        'items/fetchSearchTerm',  async (data) => {
                                            const response= await axios.post(`${BASEURL}/searchterm`, {data},{ withCredentials: true })
                                            console.log(response.data)
                                          
                                            return response.data
                                          });
                    
                                      export const fetchSearchResult = createAsyncThunk(
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        'items/fetchSearchResult',  async (searchQuery:any) => {
                                            const response= await axios.get(`${BASEURL}/search?q=${searchQuery}`,{ withCredentials: true })
                                            console.log(response.data)
                                            return response.data
                                          });
         
// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handleSearchterm : (state, action) => {
      state.searchTerm = action.payload
     }

 
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
builder.addCase(fetchAddRecentlyViewed.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchAddRecentlyViewed.fulfilled, (state, action) => {
state.message = action.payload.message
})
.addCase(fetchAddRecentlyViewed.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
builder.addCase(fetchAddItem.pending, (state) => {
  state.status = 'pending'
  })
  .addCase(fetchAddItem.fulfilled, (state, action) => {
  state.message = action.payload.message
  })
  .addCase(fetchAddItem.rejected, (state, action) => {
  state.status = 'failed'
  state.error = action.error.message;
  })
 
builder.addCase(fetchUpdateItem.pending, (state) => {
  state.status = 'pending'
  })
  .addCase(fetchUpdateItem.fulfilled, (state, action) => {
  state.message = action.payload.message
  })
  .addCase(fetchUpdateItem.rejected, (state, action) => {
  state.status = 'failed'
  state.error = action.error.message;
  })
builder.addCase(fetchDeleteItem.pending, (state) => {
  state.status = 'pending'
  })
  .addCase(fetchDeleteItem.fulfilled, (state, action) => {
  state.message = action.payload.message
  })
  .addCase(fetchDeleteItem.rejected, (state, action) => {
  state.status = 'failed'
  state.error = action.error.message;
  })
.addCase(fetchRecentlyViewed.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
state.recentlyViewed = action.payload.view.items
state.status = 'succeeded'
})
.addCase(fetchRecentlyViewed.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchGetRelated.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchGetRelated.fulfilled, (state, action) => {
  state.relatedItems=action.payload.item
  state.message= action.payload.message
})
.addCase(fetchGetRelated.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchGetItemById.pending, (state) => {
  state.status = 'pending'
  })
  .addCase(fetchGetItemById.fulfilled, (state, action) => {
    state.getItembyId=action.payload
    state.message= action.payload.message
  })
  .addCase(fetchGetItemById.rejected, (state, action) => {
  state.status = 'failed'
  state.error = action.error.message;
  })
.addCase(fetchCategory.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchCategory.fulfilled, (state, action) => {
state.category=action.payload
state.message= action.payload.message
})
.addCase(fetchCategory.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchCategoryDetails.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchCategoryDetails.fulfilled, (state, action) => {
state.categoryDetails=action.payload
state.message= action.payload.message
})
.addCase(fetchCategoryDetails.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchTopDeals.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchTopDeals.fulfilled, (state, action) => {
state.topdeals=action.payload
state.message= action.payload.message
})
.addCase(fetchTopDeals.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchFlashDeals.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchFlashDeals.fulfilled, (state, action) => {
state.flashdeals=action.payload
state.message= action.payload.message
})
.addCase(fetchFlashDeals.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchTrending.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchTrending.fulfilled, (state, action) => {
state.trending=action.payload
state.message= action.payload.message
})
.addCase(fetchTrending.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
 })
.addCase(fetchRecommended.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchRecommended.fulfilled, (state, action) => {
state.recommended=action.payload
state.message= action.payload.message
})
.addCase(fetchRecommended.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchTopFeaturedGallery.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchTopFeaturedGallery.fulfilled, (state, action) => {
state.topFeaturedGallery = action.payload
state.status = 'succeeded'
})
.addCase(fetchTopFeaturedGallery.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchTopFeaturedSlide.pending, (state) => {
    state.status = 'pending'
})
.addCase(fetchTopFeaturedSlide.fulfilled, (state, action) => {
state.topFeaturedSlide = action.payload
state.status = 'succeeded'
})
.addCase(fetchTopFeaturedSlide.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchClearance.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchClearance.fulfilled, (state, action) => {
state.clearance= action.payload
state.status = 'succeeded'
})
.addCase(fetchClearance.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchProductDetails.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchProductDetails.fulfilled, (state, action) => {
state.productDetails = action.payload
state.status = 'succeeded'
})
.addCase(fetchProductDetails.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
.addCase(fetchAllItems.pending, (state) => {
state.status = 'pending'
})
.addCase(fetchAllItems.fulfilled, (state, action) => {
state.allItems=action.payload
state.message= action.payload.message
})
.addCase(fetchAllItems.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message;
})
     
    
  },
})


// Export the generated action creators for use in components

export const getRecentlyViewedItem = (state:RootState) => state.items.recentlyViewed

export const getItemsError = (state:RootState) => state.items.error
export const getItemsStatus = (state:RootState) => state.items.error
export const getMessage =(state:RootState) => state.items.message
export const getCategory =(state:RootState) => state.items.category
export const getCategoryDetails =(state:RootState) => state.items.categoryDetails
export const getFlashDeals =(state:RootState) => state.items.flashdeals
export const getTrending =(state:RootState) => state.items.trending
export const getTopdeals =(state:RootState) => state.items.topdeals
export const getProductDetails =(state:RootState) => state.items.productDetails
export const getRecommended =(state:RootState) => state.items.recommended
export const getClearance =(state:RootState) => state.items.clearance
export const getTopFeaturedGallery =(state:RootState) => state.items.topFeaturedGallery
export const getTopFeaturedSlide =(state:RootState) => state.items.topFeaturedSlide
export const getAllItems =(state:RootState) => state.items.allItems
export const getRelated =(state:RootState) => state.items.relatedItems
export const getOneItem =(state:RootState) => state.items.getItembyId

export const getSearchResult = (state:RootState) => state.items.searchResult
export const getSearchTerm = (state:RootState) => state.items.searchTerm
// Export the slice reducer for use in the store configuration

export const {handleSearchterm} = itemsSlice.actions
export default itemsSlice.reducer;