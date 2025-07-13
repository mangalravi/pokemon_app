import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  favorites: [],
  isLoaded: false,
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Load favorites (e.g. from localStorage)
    loadFavorites: (state, action) => {
      const payload = action.payload
      // Ensure all IDs are numbers and remove duplicates
      state.favorites = Array.from(new Set(payload.map((id) => Number(id))))
      state.isLoaded = true
    },

    // Toggle favorite: add if not present, remove if exists
    toggleFavorite: (state, action) => {
      const pokemonId = Number(action.payload)
      const index = state.favorites.indexOf(pokemonId)

      if (index > -1) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(pokemonId)
      }
    },

    // Add favorite explicitly
    addFavorite: (state, action) => {
      const pokemonId = Number(action.payload)
      if (!state.favorites.includes(pokemonId)) {
        state.favorites.push(pokemonId)
      }
    },

    // Remove specific favorite
    removeFavorite: (state, action) => {
      const pokemonId = Number(action.payload)
      state.favorites = state.favorites.filter((id) => id !== pokemonId)
    },

    // Clear all favorites (e.g. on logout)
    clearFavorites: (state) => {
      state.favorites = []
    },
  },
})

export const {
  loadFavorites,
  toggleFavorite,
  addFavorite,
  removeFavorite,
  clearFavorites,
} = favoritesSlice.actions

export default favoritesSlice.reducer
