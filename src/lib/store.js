import { configureStore } from "@reduxjs/toolkit"
import pokemonFilterReducer from "../lib/features/pokemonFilterSlice"
import favoritesReducer from "../lib/features/favoritesSlice"
import pokemonReducer from "../lib/features/pokimonSlice"

export const store = configureStore({
  reducer: {
    pokemonFilter: pokemonFilterReducer,
    favorites: favoritesReducer,
    pokemon: pokemonReducer,
  },
})
