import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const  fetchAllProducts = createAsyncThunk("products/fetchAllProducts",async(_,thunkAPI) => {
    const{rejectWithValue} =thunkAPI ;


    try{
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        
        // console.log(data.data,'ajdhbfaaaaaaa');
        return data.data
    }catch(error){
           
        console.log(error);
        return rejectWithValue(error.message)
    }
}); 
const allproducts = createSlice({
    name: 'products',
    initialState: {
      products: [],
      loading: false,
      error: null
    },
   
    extraReducers: (builder) => {
      builder
        // fetch data
        .addCase(fetchAllProducts.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default allproducts.reducer;
  