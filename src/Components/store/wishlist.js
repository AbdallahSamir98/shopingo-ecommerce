import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import axios from 'axios';
import toast from "react-hot-toast";

const apiUrl = "https://ecommerce.routemisr.com/api/v1/wishlist";
const token = localStorage.getItem("userToken");

//add to wishlist
export const addToWishlistFunction = createAsyncThunk(
  "wishlist/addToWishlistFunction",
  async (productId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(productId, "productId");

    try {
      const response = await axios.post(
        apiUrl,
        { productId },
        {
          headers: {
            "Content-Type": "application/json",

            token: token,
          },
        }
      );

      console.log(response.data, "abdallah");
      if (response?.data?.status == "success") {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        toast.error("Sorry, the product was not added to the wishlist");
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Sorry, the product was not added to  the wishlist");

      return rejectWithValue(error.message);
    }
  }
);




// get wishlist
export const fetchWishlistFunction = createAsyncThunk(
  "wishlist/fetchWishlistFunction",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",

          token: token,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


//  delet from wishlist

export const deleteFromWishlist = createAsyncThunk(
  "wishlist/deleteFromWishlist",
  async (productId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",

            token: token,
          },
        }
      );
      console.log(response, "del res");
      if (response?.data?.status == "success") {
        toast.success(" The product deleted from the wishlist");
        console.log(productId, "delete proucdid");

        return productId;
      } else {
        toast.error("Sorry, the product was not deleted from the wishlist");
      }
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.message);
    }
  }
);


const addToWishlist =createSlice({
    name :'wishlist',
    initialState :{
        wishlist:[],
        loading:false,
        error:null,
    isRequiredRender: true,

    },

    extraReducers: (builder)=>{
      builder
        // insert data
        .addCase(addToWishlistFunction.pending, (state) => {
          state.loading = true;
        })
        .addCase(addToWishlistFunction.fulfilled, (state, action) => {
          state.loading = false;
          state.wishlist.push(action.payload);
        })
        .addCase(addToWishlistFunction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
         //   fetch Wishlist

      .addCase(fetchWishlistFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistFunction.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlistFunction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // delete from cart

       .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.isRequiredRender = !state.isRequiredRender;
        state.loading = false;

        // state.wishlist =state.wishlist.filter(el=>el.product.id !== action.payload)
        console.log(state.wishlist, "state.wishlist at delete fulfield");
      })
      .addCase(deleteFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    }


})

export default addToWishlist.reducer;
