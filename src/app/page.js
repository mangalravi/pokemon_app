import { Suspense } from "react"
import SearchForm from "../components/SearchForm"
import PokemonList from "../components/PokemonList"
import { getPokemonTypes, getPokemonList } from "../lib/pokimon-api"
import Link from "next/link"
import { Heart } from "lucide-react"

export default async function HomePage() {
  const [types, initialPokemon] = await Promise.all([
    getPokemonTypes(),
    getPokemonList(51),
  ])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <Link
            href="/favorites"
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-gray-700 font-medium">Favorites</span>
          </Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Pokemon Explorer</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and explore Pokemon from the world of Pokemon. Search by name or filter by type.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <SearchForm types={types} />

        <Suspense
          fallback={
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <PokemonList initialPokemon={initialPokemon} />
        </Suspense>
      </div>
    </main>
  )
}
