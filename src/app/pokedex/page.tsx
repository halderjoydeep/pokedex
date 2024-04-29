import PokemonList from '@/components/PokemonList';

interface PokeDexProps {
  searchParams: {
    page: string;
  };
}

async function PokeDex({ searchParams }: PokeDexProps) {
  const { page } = searchParams;

  const currentPage = +page || 1;

  let initialPokemons: Pokemon[] = [];
  let totalPages = 0;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon${
        currentPage > 1 ? `?offset=${(currentPage - 1) * 20}&limit=20` : ''
      }`
    );
    if (response.ok) {
      const data = await response.json();
      initialPokemons = data.results;
      totalPages = Math.ceil(data.count / 20);
    }
  } catch {
    console.log('Error fetching the API');
  }

  return (
    <div>
      <h1 className="text-center text-white text-xl font-bold my-6">
        Welcome to pokedex !
      </h1>

      <PokemonList
        initialPokemons={initialPokemons}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}

export default PokeDex;
