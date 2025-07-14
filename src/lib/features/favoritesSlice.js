import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  favorites: [],
  isLoaded: false,
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    loadFavorites: (state, action) => {
      const payload = action.payload
      state.favorites = Array.from(new Set(payload.map((id) => Number(id))))
      state.isLoaded = true
    },

    toggleFavorite: (state, action) => {
      const pokemonId = Number(action.payload)
      const index = state.favorites.indexOf(pokemonId)

      if (index > -1) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(pokemonId)
      }
    },

    addFavorite: (state, action) => {
      const pokemonId = Number(action.payload)
      if (!state.favorites.includes(pokemonId)) {
        state.favorites.push(pokemonId)
      }
    },

    removeFavorite: (state, action) => {
      const pokemonId = Number(action.payload)
      state.favorites = state.favorites.filter((id) => id !== pokemonId)
    },

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
