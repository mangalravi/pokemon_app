const POKEMON_API_BASE = "https://pokeapi.co/api/v2"

// Cache for API responses
const cache = new Map()

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url)
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    cache.set(url, data)
    return data
  } catch (error) {
    console.error("API fetch error:", error)
    throw error
  }
}

// Fetch Pokemon types
export async function getPokemonTypes() {
  const data = await fetchWithCache(`${POKEMON_API_BASE}/type`)
  return data.results
}

// Fetch list of Pokemon (e.g., first 151)
export async function getPokemonList(limit = 151) {
  const data = await fetchWithCache(`${POKEMON_API_BASE}/pokemon?limit=${limit}`)

  // Fetch detailed data for each Pokemon
  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const details = await fetchWithCache(pokemon.url)
      return details
    }),
  )

  return pokemonDetails
}

// Fetch Pokemon data by name (slug)
export async function getPokemonByName(name) {
  const data = await fetchWithCache(`${POKEMON_API_BASE}/pokemon/${name.toLowerCase()}`)
  return data
}

// Fetch Pokemon species by name (slug)
export async function getPokemonSpecies(name) {
  const data = await fetchWithCache(`${POKEMON_API_BASE}/pokemon-species/${name.toLowerCase()}`)
  return data
}

// Fetch Pokemon by type (e.g., fire, water, etc.)
export async function getPokemonByType(typeName) {
  const data = await fetchWithCache(`${POKEMON_API_BASE}/type/${typeName.toLowerCase()}`)

  // Fetch detailed data for each Pokemon in this type
  const pokemonDetails = await Promise.all(
    data.pokemon.slice(0, 20).map(async (entry) => {
      const details = await fetchWithCache(entry.pokemon.url)
      return details
    }),
  )

  return pokemonDetails
}
