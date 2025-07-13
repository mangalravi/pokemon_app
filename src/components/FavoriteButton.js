"use client"

import { Heart } from "lucide-react"
import { useFavorites } from "@/hooks/useFavorites"

export default function FavoriteButton({ pokemon }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(pokemon.id)

  return (
    <button
      onClick={() => toggleFavorite(pokemon.id)}
      className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`h-5 w-5 transition-colors ${isFavorite ? "fill-white text-white" : "text-white"}`} />
      <span className="text-white font-medium">{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
    </button>
  )
}
