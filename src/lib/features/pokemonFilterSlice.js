import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchTerm: "",
  selectedType: "",
}

const pokemonFilterSlice = createSlice({
  name: "pokemonFilter",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload
    },
    clearFilters: (state) => {
      state.searchTerm = ""
      state.selectedType = ""
    },
  },
})

export const { setSearchTerm, setSelectedType, clearFilters } = pokemonFilterSlice.actions
export default pokemonFilterSlice.reducer
