'use client';

import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'black',
    color: 'white',
  },
  overlay: { backgroundColor: 'gray' },
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(
    null
  );

  async function fetchPokemonDetail() {
    try {
      const response = await fetch(pokemon.url);
      if (response.ok) {
        try {
          const data = await response.json();
          setPokemonDetail(data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log('Error fetching the API');
    }
  }

  return (
    <>
      <div
        onClick={fetchPokemonDetail}
        className="p-6 bg-[#61dafb] flex items-center hover:scale-105 transition-colors justify-center cursor-pointer hover:bg-yellow-500 shadow-md rounded-md capitalize font-code"
      >
        {pokemon.name}
      </div>

      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail !== null}
          style={customStyles}
          contentLabel={pokemonDetail?.name || ''}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
        >
          <div className="flex flex-col items-center">
            <Image
              src={pokemonDetail.sprites.front_default}
              alt={pokemonDetail.name}
              width={96}
              height={96}
            />
            <h2 className="capitalize">{pokemonDetail.name}</h2>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PokemonCard;
