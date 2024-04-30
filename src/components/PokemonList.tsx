import Chat from "./Chat";
import PokemonCard from "./PokemonCard";
import Pagination from "./PokemonPagination";

interface PokemonListProps {
  pokemons: Pokemon[];
  totalPages: number;
  currentPage: number;
}

const PokemonList = async ({
  pokemons,
  totalPages,
  currentPage,
}: PokemonListProps) => {
  const startIndex = (currentPage - 1) * 20;
  const endIndex = currentPage * 20 <= 1302 ? currentPage * 20 : 1302;

  const pokemonsToRender = pokemons.slice(startIndex, endIndex);

  const pokemonsDetails = await Promise.all(
    pokemonsToRender.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      return data;
    }),
  );

  return (
    <div className="px-6 md:px-10">
      {pokemonsDetails.length === 0 ? (
        <p className="text-4xl text-white">No pokemon found</p>
      ) : (
        <div className="grid grid-cols-2 gap-8 pt-6 md:grid-cols-4 lg:grid-cols-5">
          {pokemonsDetails.map((pokemon, index) => {
            return <PokemonCard key={index} pokemon={pokemon} />;
          })}
        </div>
      )}

      <Pagination totalPages={totalPages} currentPage={currentPage} />
      <Chat />
    </div>
  );
};

export default PokemonList;
