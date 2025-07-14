import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getPokemonList, getPokemonTypes } from "../../lib/pokimon-api"

export const fetchPokemonList = createAsyncThunk("pokemon/fetchPokemonList", async (limit = 151) => {
  const response = await getPokemonList(limit)

  return response.map((pokemon, index) => ({
    ...pokemon,
    id: pokemon.id ?? index + 1,
  }))
})

export const fetchPokemonTypes = createAsyncThunk("pokemon/fetchPokemonTypes", async () => {
  const response = await getPokemonTypes()
  return response
})

const initialState = {
  pokemonList: [],
  types: [],
  loading: false,
  error: null,
}

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Pokemon list cases
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false
        state.pokemonList = action.payload
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Pokemon types cases
      .addCase(fetchPokemonTypes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
        state.loading = false
        state.types = action.payload
      })
      .addCase(fetchPokemonTypes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearError } = pokemonSlice.actions
export default pokemonSlice.reducer
