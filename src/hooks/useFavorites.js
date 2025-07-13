"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../lib/Hooks"
import {
  loadFavorites,
  toggleFavorite as toggleFavoriteAction,
  addFavorite as addFavoriteAction,
  removeFavorite as removeFavoriteAction,
  clearFavorites as clearFavoritesAction,
} from "@/lib/features/favoritesSlice"

export const useFavorites = () => {
  const dispatch = useAppDispatch()
  const { favorites, isLoaded } = useAppSelector((state) => state.favorites)

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (!isLoaded) {
      const savedFavorites = localStorage.getItem("pokemon-favorites")
      if (savedFavorites) {
        try {
          const parsedFavorites = JSON.parse(savedFavorites)
          // Only load favorites into Redux if they are an array
          if (Array.isArray(parsedFavorites)) {
            dispatch(loadFavorites(parsedFavorites))
          } else {
            dispatch(loadFavorites([])) // Ensure fallback if saved data is corrupted
          }
        } catch (error) {
          console.error("Error loading favorites:", error)
          dispatch(loadFavorites([])) // Fallback to empty array if error
        }
      } else {
        dispatch(loadFavorites([])) // No saved data in localStorage, load empty array
      }
    }
  }, [dispatch, isLoaded])

  // Save favorites to localStorage whenever they are updated
  useEffect(() => {
    if (isLoaded) {
      try {
        // Only persist if favorites are available and valid
        localStorage.setItem("pokemon-favorites", JSON.stringify(favorites))
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error)
      }
    }
  }, [favorites, isLoaded])

  // Toggle favorite (add/remove based on existing state)
  const toggleFavorite = (pokemonId) => {
    dispatch(toggleFavoriteAction(pokemonId))
  }

  // Explicitly add a Pokémon to favorites
  const addFavorite = (pokemonId) => {
    dispatch(addFavoriteAction(pokemonId))
  }

  // Explicitly remove a Pokémon from favorites
  const removeFavorite = (pokemonId) => {
    dispatch(removeFavoriteAction(pokemonId))
  }

  // Clear all favorites (useful for a reset or logout)
  const clearFavorites = () => {
    dispatch(clearFavoritesAction())
  }

  return {
    favorites,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  }
}
