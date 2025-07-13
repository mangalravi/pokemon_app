"use client"

import { useAppSelector } from "../lib/Hooks"

export default function DevTools() {
  const pokemonFilter = useAppSelector((state) => state.pokemonFilter)
  const favorites = useAppSelector((state) => state.favorites)

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs">
      {/* <h4 className="font-bold mb-2">Redux DevTools</h4> */}
      <div className="space-y-1">
        <div>Search: {pokemonFilter.searchTerm}</div>
        <div>Type: {pokemonFilter.selectedType}</div>
        <div>Favorites: {favorites.favorites.length}</div>
      </div>
    </div>
  )
}
