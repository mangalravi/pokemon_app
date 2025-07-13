"use client"

import { useMemo } from "react"
import PokemonCard from "./PokemonCard"
import { usePokemonFilter } from "../hooks/usePokemonFilterStore"
import { useDebounce } from "../hooks/useDebounce"

export default function PokemonList({ initialPokemon }) {
  const { searchTerm, selectedType } = usePokemonFilter()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredPokemon = useMemo(() => {
    let filtered = initialPokemon

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter((pokemon) => pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter((pokemon) => pokemon.types.some((type) => type.type.name === selectedType))
    }

    return filtered
  }, [initialPokemon, debouncedSearchTerm, selectedType])

  if (filteredPokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pokemon Found</h3>
        <p className="text-gray-500">Try adjusting your search terms or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
