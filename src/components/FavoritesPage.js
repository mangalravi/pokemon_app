"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import PokemonCard from "./PokemonCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useAppSelector, useAppDispatch } from "../lib/Hooks";

// Correct import from pokemonSlice where fetchPokemonList is defined
import { fetchPokemonList } from "../lib/features/pokimonSlice";

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const { favorites } = useFavorites();
  const { pokemonList, loading } = useAppSelector((state) => state.pokemon);

  // Fetch Pokémon list on mount if empty
  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      dispatch(fetchPokemonList());
    }
  }, [dispatch, pokemonList]);

  // Normalize favorites to numbers (important if stored as strings)
  const normalizedFavorites = useMemo(() => favorites.map(Number), [favorites]);

  // Filter pokemonList to only those in favorites
  const favoritePokemon = useMemo(() => {
    if (!pokemonList) return [];
    return pokemonList.filter((pokemon) => normalizedFavorites.includes(Number(pokemon.id)));
  }, [pokemonList, normalizedFavorites]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Link
          href="/"
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Back to Home"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <span>Favorite Pokémon</span>
          </h1>
          <p className="text-gray-600 mt-2">
            {normalizedFavorites.length} Pokémon in your favorites
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading your Pokémon...</div>
      ) : favoritePokemon.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Favorite Pokémon Yet</h3>
          <p className="text-gray-500 mb-6">
            Start exploring and add some Pokémon to your favorites!
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Pokémon
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoritePokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={{
                ...pokemon,
                type: pokemon.type ?? "unknown", // fallback type
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
