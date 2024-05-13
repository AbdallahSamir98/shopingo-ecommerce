import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://ecommerce.routemisr.com/api/v1/cart";
const token = localStorage.getItem("userToken");

//add to cart
export const addToCartFunction = createAsyncThunk(
  "cart/addToCartFunction",
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

      console.log(response.data.data, "abdallah");
      if (response?.data?.status == "success") {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        toast.error("Sorry, the product was not added to the cart");
      }
    } catch (error) {
      console.log(error, "error");
      // toast.error("Sorry, the product was not added to the cart you must login first");


      return rejectWithValue(error.message);
    }
  }
);

// get cart
export const fetchCartFunction = createAsyncThunk(
  "cart/fetchCartFunction",
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

//  delet from cart

export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (productId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",

            token: token,
          },
        }
      );
      console.log(response, "del res");
      if (response?.data?.status == "success") {
        toast.success(" The product deleted from the cart");
        console.log(productId, "delete proucdid");

        return productId;
      } else {
        toast.error("Sorry, the product was not deleted from the cart");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

//  delet all cart

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            "Content-Type": "application/json",

            token: token,
          },
        }
      );
      console.log(response.data, "del res");
      if (response?.data?.message == "success") {
        toast.success(" The products deleted from the cart");

        return response.data.data;
      } else {
        toast.error("Sorry, the product was not deleted from the cart");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);


// update quantity

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({  productId ,count }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(count, " updated count");
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log(response, "updateQuantity res");

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);


const addToCart = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: null,
    isRequiredRender: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // insert data
      .addCase(addToCartFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartFunction.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload);
      })
      .addCase(addToCartFunction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   fetch cart

      .addCase(fetchCartFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartFunction.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartFunction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete from cart

      .addCase(deleteFromCart.fulfilled, (state,) => {
        state.isRequiredRender = !state.isRequiredRender;
        state.loading = false;

        // state.cart =state.cart.filter(el=>el.product.id !== action.payload)
        console.log(state.cart, "state.cart at delete fulfield");
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete all cart
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = []; // Set the cart to an empty array since all items are deleted
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // update quantity
       .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        // Update the quantity of the specific product in the cart
        state.cart = state.cart.map((item) => {
          if (item.product.id === action.payload) {
            return {
              ...item,
              count: action.payload.count,
            };
          }
          return item;
        });
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  
  },
});

export default addToCart.reducer;
