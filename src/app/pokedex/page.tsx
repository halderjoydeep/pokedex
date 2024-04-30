import Header from "@/components/Header";
import PokemonList from "@/components/PokemonList";

interface PokeDexProps {
  searchParams: {
    page: string;
    s: string;
    sort: "asc" | "desc" | "default";
  };
}

async function PokeDex({ searchParams }: PokeDexProps) {
  const { page, s, sort } = searchParams;

  const currentPage = +page || 1;

  let pokemons: Pokemon[] = [];

  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1302",
    );
    if (response.ok) {
      const data = await response.json();
      pokemons = data.results;
    }
  } catch {
    console.log("Error fetching the API");
  }

  if (s) {
    pokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(s.toLowerCase()),
    );
  }

  if (sort) {
    if (sort === "asc") {
      pokemons = pokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "desc") {
      pokemons = pokemons.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  const totalPages = Math.ceil(pokemons.length / 20);

  return (
    <main>
      <Header />

      <PokemonList
        pokemons={pokemons}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </main>
  );
}

export default PokeDex;
