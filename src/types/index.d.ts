interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: Stat[];
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
