import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  filters: {
    name: "",
    category: "",
    employee: "",
    section: ""
  } 
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          product.employee.toLowerCase().includes(search.toLowerCase()) ||
          product.section.toLowerCase().includes(search.toLowerCase()) ||
          product.old_inventory.toLowerCase().includes(search.toLowerCase()) ||
          product.mac_lan.toLowerCase().includes(search.toLowerCase()) ||
          product.mac_wifi.toLowerCase().includes(search.toLowerCase()) ||
          product.inventory.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()) 
      );

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;



