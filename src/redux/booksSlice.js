import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../config/firebase";

// --------------------- Thunks ---------------------

// Fetch all books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const res = await axios.get("https://clevr-e-com-boew.onrender.com/api/products");
    return res.data;
  }
);

// Fetch cart items for a user
export const fetchCart = createAsyncThunk(
  "books/fetchCart",
  async (userId) => {
    const res = await axios.get(`https://clevr-e-com-boew.onrender.com/api/cart/${userId}`);
    return res.data;
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  "books/addToCart",
  async (item) => {
    const res = await axios.post("https://clevr-e-com-boew.onrender.com/api/cart", item);
    return res.data;
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "books/removeFromCart",
  async (cartId) => {
    await axios.delete(`https://clevr-e-com-boew.onrender.com/api/cart/${cartId}`);
    return cartId;
  }
);

// Update cart quantity
export const updateCartQuantity = createAsyncThunk(
  "books/updateCartQuantity",
  async ({ cartId, quantity }, { dispatch }) => {
    await axios.put(`https://clevr-e-com-boew.onrender.com/api/cart/${cartId}`, { quantity });
    const user = auth.currentUser;
    if (user) dispatch(fetchCart(user.uid));
    return { cartId, quantity };
  }
);

// Fetch favorites for a user
export const fetchFavorites = createAsyncThunk(
  "books/fetchFavorites",
  async (userId) => {
    const res = await axios.get(`https://clevr-e-com-boew.onrender.com/api/favorites/${userId}`);
    return res.data; // backend must populate productId
  }
);

// Toggle favorite
export const toggleFavorite = createAsyncThunk(
  "books/toggleFavorite",
  async ({ userId, productId }) => {
    const res = await axios.get(`https://clevr-e-com-boew.onrender.com/api/favorites/${userId}`);
    const existing = res.data.find(f => f.productId._id === productId);

    if (existing) {
      await axios.delete(`https://clevr-e-com-boew.onrender.com/api/favorites/${existing._id}`);
    } else {
      await axios.post("https://clevr-e-com-boew.onrender.com/api/favorites", { userId, productId });
    }

    return productId;
  }
);

// --------------------- Slice ---------------------

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    cart: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---------------- Books ----------------
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.items = action.payload.map((b, i) => ({
          ...b,
          uniqueId: b._id || `book-${i}`,
        }));
      })

      // ---------------- Cart ----------------
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload.map(c => ({
          ...c.productId,
          cartId: c._id,
          quantity: c.quantity,
        }));
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existing = state.cart.find(i => i.cartId === item._id);
        if (existing) existing.quantity = item.quantity;
        else state.cart.push({ ...item.productId, cartId: item._id, quantity: item.quantity });
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(i => i.cartId !== action.payload);
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { cartId, quantity } = action.payload;
        const item = state.cart.find(i => i.cartId === cartId);
        if (item) item.quantity = quantity;
      })

      // ---------------- Favorites ----------------
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload.map(f => f.productId._id);
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const productId = action.payload;
        if (state.favorites.includes(productId)) {
          state.favorites = state.favorites.filter(id => id !== productId);
        } else {
          state.favorites.push(productId);
        }
      });
  },
});

export default booksSlice.reducer;
