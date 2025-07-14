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

  useEffect(() => {
    if (!isLoaded) {
      const savedFavorites = localStorage.getItem("pokemon-favorites")
      if (savedFavorites) {
        try {
          const parsedFavorites = JSON.parse(savedFavorites)
          if (Array.isArray(parsedFavorites)) {
            dispatch(loadFavorites(parsedFavorites))
          } else {
            dispatch(loadFavorites([])) 
          }
        } catch (error) {
          console.error("Error loading favorites:", error)
          dispatch(loadFavorites([]))
        }
      } else {
        dispatch(loadFavorites([])) 
      }
    }
  }, [dispatch, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("pokemon-favorites", JSON.stringify(favorites))
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error)
      }
    }
  }, [favorites, isLoaded])

  const toggleFavorite = (pokemonId) => {
    dispatch(toggleFavoriteAction(pokemonId))
  }

  const addFavorite = (pokemonId) => {
    dispatch(addFavoriteAction(pokemonId))
  }

  const removeFavorite = (pokemonId) => {
    dispatch(removeFavoriteAction(pokemonId))
  }

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
