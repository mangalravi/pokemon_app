"use client"

import { useAppDispatch, useAppSelector } from "../lib/Hooks"
import { setSearchTerm, setSelectedType, clearFilters } from "@/lib/features/pokemonFilterSlice"

export const usePokemonFilter = () => {
  const dispatch = useAppDispatch()
  const { searchTerm, selectedType } = useAppSelector((state) => state.pokemonFilter)

  const handleSetSearchTerm = (term) => {
    dispatch(setSearchTerm(term))
  }

  const handleSetSelectedType = (type) => {
    dispatch(setSelectedType(type))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  return {
    searchTerm,
    selectedType,
    setSearchTerm: handleSetSearchTerm,
    setSelectedType: handleSetSelectedType,
    clearFilters: handleClearFilters,
  }
}
