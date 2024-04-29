'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import BarChart from './BarChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  const modalRef = useRef(null);

  const downloadPdf = async () => {
    const inputData = modalRef.current;

    if (!inputData) return;

    try {
      const canvas = await html2canvas(inputData, { scale: 3 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`${pokemon.name}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

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
          <div
            className="relative flex flex-col items-center bg-black px-6"
            ref={modalRef}
          >
            <Image
              src={pokemonDetail.sprites.front_default}
              alt={pokemonDetail.name}
              width={96}
              height={96}
            />
            <h2 className="capitalize mb-4 font-code text-[#61dafb]">
              {pokemonDetail.name}
            </h2>
            <table className="mb-4">
              <thead>
                <tr>
                  <th className="table-cell">Stat Name</th>
                  <th className="table-cell">Base Stat</th>
                </tr>
              </thead>
              <tbody>
                {pokemonDetail.stats.map((item) => (
                  <tr key={item.stat.name}>
                    <td className="table-cell">{item.stat.name}</td>
                    <td className="table-cell">{item.base_stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <BarChart stats={pokemonDetail.stats} />

            <button
              className="absolute top-0 right-0"
              onClick={downloadPdf}
              data-html2canvas-ignore
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PokemonCard;
