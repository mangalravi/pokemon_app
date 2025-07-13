"use client"
import { useAppDispatch, useAppSelector } from "../lib/Hooks"
import { fetchPokemonList, fetchPokemonTypes, clearError } from "@/lib/features/pokemonSlice"

export const usePokemon = () => {
  const dispatch = useAppDispatch()
  const { pokemonList, types, loading, error } = useAppSelector((state) => state.pokemon)

  const loadPokemonList = (limit = 151) => {
    dispatch(fetchPokemonList(limit))
  }

  const loadPokemonTypes = () => {
    dispatch(fetchPokemonTypes())
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  return {
    pokemonList,
    types,
    loading,
    error,
    loadPokemonList,
    loadPokemonTypes,
    clearError: handleClearError,
  }
}
