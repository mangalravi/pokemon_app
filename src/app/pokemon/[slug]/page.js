import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FavoriteButton from "@/components/FavoriteButton";
import { getPokemonByName, getPokemonSpecies } from "../../../lib/pokimon-api";
import { capitalizeFirst, formatStatName } from "../../../lib/utils";

export async function generateMetadata({ params }) {
  try {
    const name = params.slug.toLowerCase();
    const pokemon = await getPokemonByName(name);
    return {
      title: `${capitalizeFirst(pokemon.name)} - Pokemon Explorer`,
      description: `Detailed information about ${capitalizeFirst(
        pokemon.name
      )} including stats, abilities, and more.`,
    };
  } catch {
    return {
      title: "Pokemon Not Found - Pokemon Explorer",
    };
  }
}
export default async function PokemonDetailPage({ params }) {
  try {
    const name = params.slug.toLowerCase();

    const [pokemon, species] = await Promise.all([
      getPokemonByName(name),
      getPokemonSpecies(name).catch(() => null),
    ]);

    if (!pokemon) return notFound();

    const breadcrumbItems = [
      { label: "Home", href: "/" },
      {
        label: capitalizeFirst(pokemon.name),
        href: `/pokemon/${pokemon.name.toLowerCase()}`,
      },
    ];

    return (
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </Link>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">
                      {capitalizeFirst(pokemon.name)}
                    </h1>
                    <p className="text-blue-100">
                      #{pokemon.id.toString().padStart(3, "0")}
                    </p>
                  </div>
                </div>
                <FavoriteButton pokemon={pokemon} />
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    <Image
                      src={
                        pokemon.sprites.other["official-artwork"]
                          .front_default || pokemon.sprites.front_default
                      }
                      alt={pokemon.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Types */}
                  <div className="flex justify-center space-x-2 mb-4">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTypeColor(
                          type.type.name
                        )}`}
                      >
                        {capitalizeFirst(type.type.name)}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-2xl font-bold text-gray-800">
                        {pokemon.height / 10}m
                      </p>
                      <p className="text-gray-600">Height</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-2xl font-bold text-gray-800">
                        {pokemon.weight / 10}kg
                      </p>
                      <p className="text-gray-600">Weight</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Abilities
                    </h3>
                    <div className="space-y-2">
                      {pokemon.abilities.map((ability) => (
                        <div
                          key={ability.ability.name}
                          className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                        >
                          <span className="font-medium">
                            {capitalizeFirst(
                              ability.ability.name.replace("-", " ")
                            )}
                          </span>
                          {ability.is_hidden && (
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              Hidden
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Base Stats
                    </h3>
                    <div className="space-y-3">
                      {pokemon.stats.map((stat) => (
                        <div key={stat.stat.name}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              {formatStatName(stat.stat.name)}
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {stat.base_stat}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(
                                  (stat.base_stat / 255) * 100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {species?.flavor_text_entries && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {species.flavor_text_entries
                          .find((entry) => entry.language.name === "en")
                          ?.flavor_text.replace(/\f/g, " ") ||
                          "No description available."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading Pokemon:", error);
    notFound();
  }
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
  };
  return colors[type] || "bg-gray-400";
}
