import { useEffect, useState } from 'react';
import { loadPokemon, normalizeQuery, readableName } from '@retro-dex/core';
import type { Pokemon, Species } from '@retro-dex/core';

type Request = { query: string; revision: number };

export function usePokemonSearch() {
  const [request, setRequest] = useState<Request>({ query: 'pikachu', revision: 0 });
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<Species | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Abriendo el archivo...');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setIsError(false);
    setMessage('Buscando en los archivos del bosque...');

    void loadPokemon(request.query, controller.signal)
      .then(({ pokemon: found, species: foundSpecies, speciesUnavailable }) => {
        if (controller.signal.aborted) return;
        setPokemon(found);
        setSpecies(foundSpecies);
        setMessage(speciesUnavailable
          ? `Registro encontrado: ${readableName(found.name)}. No se pudieron cargar sus formas.`
          : `Registro encontrado: ${readableName(found.name)}.`);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setIsError(true);
        setMessage(error instanceof TypeError
          ? 'No hay conexión con PokéAPI. Revisa internet e intenta de nuevo.'
          : error instanceof Error ? error.message : 'No se pudo cargar el Pokémon.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [request]);

  function search(value: string) {
    const query = normalizeQuery(value);
    if (!query) {
      setIsError(true);
      setMessage('Escribe un nombre o número antes de buscar.');
      return;
    }
    setRequest(previous => ({ query, revision: previous.revision + 1 }));
  }

  return { pokemon, species, loading, message, isError, search };
}
