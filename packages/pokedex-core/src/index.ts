const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

type NamedResource = { name: string; url: string };

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  species: NamedResource;
  types: { type: NamedResource }[];
  abilities: { ability: NamedResource; is_hidden: boolean }[];
  stats: { base_stat: number; stat: NamedResource }[];
  sprites: {
    front_default: string | null;
    versions?: {
      'generation-v'?: { 'black-white'?: { animated?: { front_default?: string | null } } };
    };
    other?: { 'official-artwork'?: { front_default?: string | null } };
  };
};

export type Species = {
  id: number;
  name: string;
  varieties: { pokemon: NamedResource }[];
};

export type PokemonResult = {
  pokemon: Pokemon;
  species: Species | null;
  speciesUnavailable: boolean;
};

export const typeNames: Record<string, string> = {
  normal: 'NORMAL', fire: 'FUEGO', water: 'AGUA', electric: 'ELÉCTRICO',
  grass: 'PLANTA', ice: 'HIELO', fighting: 'LUCHA', poison: 'VENENO',
  ground: 'TIERRA', flying: 'VOLADOR', psychic: 'PSÍQUICO', bug: 'BICHO',
  rock: 'ROCA', ghost: 'FANTASMA', dragon: 'DRAGÓN', dark: 'SINIESTRO',
  steel: 'ACERO', fairy: 'HADA',
};

export const statLabels: Record<string, string> = {
  hp: 'PS', attack: 'ATAQUE', defense: 'DEFENSA',
  'special-attack': 'AT. ESP.', 'special-defense': 'DEF. ESP.', speed: 'VELOCIDAD',
};

export function readableName(value: string): string {
  return value.replaceAll('-', ' ').replace(/\b\w/g, letter => letter.toUpperCase());
}

export function normalizeQuery(value: string): string {
  return value.trim().toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s_]+/g, '-');
}

export function varietyLabel(speciesName: string, pokemonName: string): string {
  if (pokemonName === speciesName) return 'ORIGINAL';
  const suffix = pokemonName.startsWith(`${speciesName}-`)
    ? pokemonName.slice(speciesName.length + 1)
    : pokemonName;
  return suffix === 'gmax' ? 'GIGAMAX' : readableName(suffix).toUpperCase();
}

export function pokemonSprite(pokemon: Pokemon): string | null {
  return pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default
    ?? pokemon.sprites.front_default
    ?? pokemon.sprites.other?.['official-artwork']?.front_default
    ?? null;
}

export async function loadPokemon(query: string, signal: AbortSignal): Promise<PokemonResult> {
  const response = await fetch(`${API_URL}${encodeURIComponent(query)}`, { signal });
  if (response.status === 404) throw new Error('No encontramos ese Pokémon. Revisa el nombre o número.');
  if (!response.ok) throw new Error('PokéAPI no respondió correctamente. Intenta de nuevo.');

  const pokemon = await response.json() as Pokemon;
  let species: Species | null = null;
  let speciesUnavailable = false;

  if (pokemon.species?.name) {
    try {
      const speciesResponse = await fetch(
        `${SPECIES_URL}${encodeURIComponent(pokemon.species.name)}`, { signal },
      );
      if (speciesResponse.ok) species = await speciesResponse.json() as Species;
      else speciesUnavailable = true;
    } catch (error) {
      if (signal.aborted) throw error;
      speciesUnavailable = true;
    }
  }

  return { pokemon, species, speciesUnavailable };
}
