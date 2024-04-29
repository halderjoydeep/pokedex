'use client';

import { KeyboardEvent, Suspense, useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import Sort from './Sort';
import Pagination from './Pagination';
import Chat from './Chat';

interface PokemonListProps {
  initialPokemons: Pokemon[];
  totalPages: number;
  currentPage: number;
}

const PokemonList = ({
  initialPokemons,
  totalPages,
  currentPage,
}: PokemonListProps) => {
  const [searchText, setSearchText] = useState('');
  const [sortValue, setSortValue] = useState('default');

  const [pokemons, setPokemons] = useState(initialPokemons);
  const [sortedPokemons, setSortedPokemons] = useState(pokemons);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const filteredPokemons = initialPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setPokemons(filteredPokemons);
    }
  };

  useEffect(() => {
    if (searchText === '') {
      setPokemons(initialPokemons);
    }
  }, [searchText, initialPokemons]);

  useEffect(() => {
    if (sortValue === 'asc') {
      setSortedPokemons(
        [...pokemons].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (sortValue === 'desc') {
      setSortedPokemons(
        [...pokemons].sort((a, b) => b.name.localeCompare(a.name))
      );
    } else {
      setSortedPokemons(pokemons);
    }
  }, [sortValue, pokemons]);

  return (
    <div className="px-6 md:px-10">
      <div className="flex md:flex-row flex-col md:items-center mb-6 justify-between gap-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleKeyUp}
          className="block w-full px-4 rounded-md shadow-sm py-2 md:w-2/5 placeholder:text-left"
          autoComplete="off"
        />

        <Sort onSortChange={(value) => setSortValue(value)} />
      </div>

      {sortedPokemons.length === 0 ? (
        <p className="text-white text-4xl">No pokemon found</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-8 sm:grid-cols-2 border-t border-gray-600 pt-6">
          {sortedPokemons.map((pokemon, index) => {
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
