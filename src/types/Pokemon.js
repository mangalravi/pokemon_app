// Type definitions for Pokemon data structures

export const PokemonType = {
  id: "number",
  name: "string",
  sprites: {
    front_default: "string",
    other: {
      "official-artwork": {
        front_default: "string",
      },
    },
  },
  types: [
    {
      type: {
        name: "string",
        url: "string",
      },
    },
  ],
  stats: [
    {
      base_stat: "number",
      stat: {
        name: "string",
      },
    },
  ],
  abilities: [
    {
      ability: {
        name: "string",
      },
      is_hidden: "boolean",
    },
  ],
  height: "number",
  weight: "number",
}

export const PokemonTypeFilter = {
  name: "string",
  url: "string",
}
