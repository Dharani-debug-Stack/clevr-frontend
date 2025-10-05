import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    const res = await axios.get("https://clevr-e-com-boew.onrender.com/api/products");
    return res.data;
  }
);

// Add new product
export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (productData) => {
    const res = await axios.post("https://clevr-e-com-boew.onrender.com/api/products", productData);
    return res.data.product;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(addProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addProduct.fulfilled, (state, action) => { state.loading = false; state.products.push(action.payload); })
      .addCase(addProduct.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default adminSlice.reducer;
