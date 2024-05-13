import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const  fetchallCategories = createAsyncThunk("category/fetchallCategories",async(_,thunkAPI) => {
    const{rejectWithValue} =thunkAPI ;


    try{
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        
        // console.log(data.data,'ajdhbfaaaaaaa');
        return data.data
    }catch(error){
           
        console.log(error);
        return rejectWithValue(error.message)
    }
}); 
const allCategories = createSlice({
    name: 'category',
    initialState: {
      category: [],
      loading: false,
      error: null
    },
   
    extraReducers: (builder) => {
      builder
        // fetch data
        .addCase(fetchallCategories.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchallCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.category = action.payload;
        })
        .addCase(fetchallCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default allCategories.reducer;
  