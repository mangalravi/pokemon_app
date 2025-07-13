"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useFavorites } from "@/hooks/useFavorites"
import { capitalizeFirst } from "@/lib/utils"

export default function PokemonCard({ pokemon }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(pokemon.id)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(pokemon.id)
  }

  return (
    <Link href={`/pokemon/${pokemon.name.toLowerCase()}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
        {/* Favorite Button */}
        <div className="relative">
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            />
          </button>

          {/* Pokemon Image */}
          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <Image
              src={pokemon.sprites.other["official-artwork"]?.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              width={120}
              height={120}
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Pokemon Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {capitalizeFirst(pokemon.name)}
            </h3>
            <span className="text-sm text-gray-500 font-medium">#{pokemon.id.toString().padStart(3, "0")}</span>
          </div>

          {/* Types */}
          <div className="flex flex-wrap gap-1">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(type.type.name)}`}
              >
                {capitalizeFirst(type.type.name)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

function getTypeColor(type) {
  const colors = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-300",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  }
  return colors[type] || "bg-gray-400"
}
