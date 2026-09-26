import { useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { usePokemonSearch } from './hooks/usePokemonSearch';
import {
  pokemonSprite, readableName, statLabels, typeNames, varietyLabel,
} from '@retro-dex/core';
import type { Pokemon, Species } from '@retro-dex/core';

const particles = Array.from({ length: 18 }, (_, index) => ({
  '--x': `${6 + (index * 37) % 88}%`,
  '--y': `${20 + (index * 29) % 67}%`,
  '--delay': `${-((index * 7) % 19) / 4}s`,
  '--duration': `${2.7 + (index % 5) * 0.55}s`,
} as CSSProperties));

function WorldBackdrop() {
  return (
    <div className="world-backdrop" aria-hidden="true">
      <span className="world-backdrop__sun" />
      <span className="world-backdrop__cloud world-backdrop__cloud--one" />
      <span className="world-backdrop__cloud world-backdrop__cloud--two" />
      <span className="world-backdrop__cloud world-backdrop__cloud--three" />
      <span className="world-backdrop__hill world-backdrop__hill--left" />
      <span className="world-backdrop__hill world-backdrop__hill--right" />
    </div>
  );
}

function HeroLandscape() {
  return (
    <div className="hero-landscape" aria-hidden="true">
      <span className="hero-landscape__sun" />
      <span className="hero-landscape__cloud hero-landscape__cloud--left" />
      <span className="hero-landscape__cloud hero-landscape__cloud--right" />
      <span className="hero-landscape__hill hero-landscape__hill--left" />
      <span className="hero-landscape__hill hero-landscape__hill--right" />
      <span className="hero-landscape__path" />
      <span className="hero-landscape__bush hero-landscape__bush--left" />
      <span className="hero-landscape__bush hero-landscape__bush--right" />
      <span className="hero-landscape__ground" />
    </div>
  );
}

function PokemonSprite({ pokemon }: { pokemon: Pokemon | null }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const sprite = pokemon ? pokemonSprite(pokemon) : null;

  return (
    <div className="scene__sprite">
      {sprite && !failed && (
        <img
          id="pokemonImage"
          src={sprite}
          alt={`Sprite de ${readableName(pokemon!.name)}`}
          style={{ display: loaded ? 'block' : 'none' }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      {(!sprite || !loaded || failed) && (
        <span id="spriteFallback" aria-hidden="true">{sprite && !failed ? '…' : '?'}</span>
      )}
    </div>
  );
}

function PokemonScene({ pokemon, species }: { pokemon: Pokemon | null; species: Species | null }) {
  const primaryType = pokemon?.types[0]?.type.name ?? 'normal';
  const sceneType = Object.hasOwn(typeNames, primaryType) ? primaryType : 'normal';

  return (
    <div className="record__visual">
      <div className="scene" data-type={sceneType} aria-label="Escena pixelada del territorio del Pokémon">
        <div className="scene__sky" aria-hidden="true" />
        <div className="scene__tree scene__tree--left" aria-hidden="true" />
        <div className="scene__tree scene__tree--right" aria-hidden="true" />
        <div className="scene__ground" aria-hidden="true" />
        <div className="scene__landscape" aria-hidden="true">
          <span className="scene__orb" />
          <span className="scene__ridge scene__ridge--left" />
          <span className="scene__ridge scene__ridge--right" />
          <span className="scene__prop scene__prop--left" />
          <span className="scene__prop scene__prop--right" />
          <span className="scene__weather scene__weather--left" />
          <span className="scene__weather scene__weather--right" />
          <span className="scene__bolt scene__bolt--left" />
          <span className="scene__bolt scene__bolt--right" />
        </div>
        <div className="scene__atmosphere" aria-hidden="true">
          {particles.map((style, index) => <span className="scene__particle" style={style} key={index} />)}
        </div>
        <div className="scene__light" aria-hidden="true" />
        <PokemonSprite key={pokemon?.name ?? 'empty'} pokemon={pokemon} />
        <span className="scene__label">
          {pokemon ? `TERRITORIO ${typeNames[sceneType]}` : 'ENCUENTRO SALVAJE'}
        </span>
      </div>
      <div className="visual-caption">
        <span>FIG. <strong>{pokemon ? `#${String(species?.id ?? pokemon.id).padStart(4, '0')}` : '----'}</strong></span>
        <span>POKÉAPI / ARCHIVE</span>
      </div>
    </div>
  );
}

type PokemonDetailsProps = {
  pokemon: Pokemon | null;
  species: Species | null;
  loading: boolean;
  onVarietySelect: (name: string) => void;
};

function PokemonDetails({ pokemon, species, loading, onVarietySelect }: PokemonDetailsProps) {
  const varieties = species?.varieties ?? [];

  return (
    <div className="record__data">
      <div className="nameplate">
        <div>
          <p className="panel-kicker">CRIATURA ENCONTRADA</p>
          <h2 id="pokemonName">{pokemon ? readableName(pokemon.name).toUpperCase() : 'ESPERANDO...'}</h2>
        </div>
        <span className="nameplate__star" aria-hidden="true">✦</span>
      </div>

      <div className="type-row">
        <span className="field-label">TIPO</span>
        <div className="type-list">
          {pokemon ? pokemon.types.map(({ type }) => (
            <span className="type-badge" data-type={type.name} key={type.name}>
              {typeNames[type.name] ?? readableName(type.name)}
            </span>
          )) : '—'}
        </div>
      </div>

      {varieties.length > 1 && pokemon && (
        <div className="variety-row">
          <span className="field-label">FORMAS</span>
          <div className="variety-list" aria-label="Formas disponibles del Pokémon">
            {varieties.map(({ pokemon: variety }) => (
              <button
                className="variety-button"
                type="button"
                key={variety.name}
                aria-pressed={variety.name === pokemon.name}
                disabled={loading}
                onClick={() => onVarietySelect(variety.name)}
              >
                {varietyLabel(species!.name, variety.name)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="measures">
        <div><span className="field-label">ALTURA</span><strong>{pokemon ? `${(pokemon.height / 10).toFixed(1)} m` : '—'}</strong></div>
        <div><span className="field-label">PESO</span><strong>{pokemon ? `${(pokemon.weight / 10).toFixed(1)} kg` : '—'}</strong></div>
        <div><span className="field-label">EXP. BASE</span><strong>{pokemon?.base_experience ?? '—'}</strong></div>
      </div>

      <section className="info-section" aria-labelledby="abilitiesTitle">
        <div className="section-heading"><h3 id="abilitiesTitle">HABILIDADES</h3><span aria-hidden="true">✦</span></div>
        <div className="abilities">
          {pokemon ? pokemon.abilities.map(({ ability, is_hidden: isHidden }) => (
            <span className="ability-chip" key={ability.name}>
              {readableName(ability.name)}{isHidden ? ' ★' : ''}
            </span>
          )) : '—'}
        </div>
      </section>

      <section className="info-section" aria-labelledby="statsTitle">
        <div className="section-heading"><h3 id="statsTitle">ESTADÍSTICAS BASE</h3><span>MAX 255</span></div>
        <div className="stats">
          {pokemon ? pokemon.stats.map(({ base_stat: value, stat }) => (
            <div className="stat" key={stat.name}>
              <span className="stat__label">{statLabels[stat.name] ?? readableName(stat.name)}</span>
              <strong className="stat__value">{value}</strong>
              <span className="stat__track" aria-hidden="true">
                <span className="stat__bar" style={{ width: `${Math.min((value / 255) * 100, 100)}%` }} />
              </span>
            </div>
          )) : '—'}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [input, setInput] = useState('');
  const { pokemon, species, loading, message, isError, search } = usePokemonSearch();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search(input);
  }

  function selectVariety(name: string) {
    setInput(readableName(name));
    search(name);
  }

  return (
    <>
      <WorldBackdrop />
      <div className="page-frame">
        <header className="topbar">
          <div className="brand">
            <span className="brand__icon" aria-hidden="true">✦</span>
            <div><p className="eyebrow">GUÍA DE CAMPO · EDICIÓN 01</p><h1>POKÉDEX</h1></div>
          </div>
          <div className="topbar__right" aria-label="Decoración de corazones retro">
            <span className="hearts" aria-hidden="true">♥ ♥ ♥</span>
            <span className="topbar__tag">ARCHIVO DEL BOSQUE</span>
          </div>
        </header>

        <main>
          <HeroLandscape />
          <div className="game-frame">
            <div className="game-frame__top" aria-hidden="true">
              <span>◆ REGISTRO DE CAMPO</span><span>01 / DATOS</span>
            </div>

            <section className="search-panel" aria-labelledby="search-title">
              <div><p className="panel-kicker">ELIGE TU DESTINO</p><h2 id="search-title">¿A quién buscamos?</h2></div>
              <form className="search-form" onSubmit={submit}>
                <label className="sr-only" htmlFor="searchInput">Nombre o número del Pokémon</label>
                <span className="search-form__prompt" aria-hidden="true">▶</span>
                <input
                  id="searchInput" name="pokemon" type="search" autoComplete="off" spellCheck={false}
                  placeholder="pikachu, 25 o charizard mega x" required value={input}
                  onChange={event => setInput(event.target.value)}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'BUSCANDO...' : <>BUSCAR <span aria-hidden="true">↵</span></>}
                </button>
              </form>
            </section>

            <section className={`record${loading ? ' is-loading' : ''}`} aria-label="Ficha del Pokémon">
              <PokemonScene pokemon={pokemon} species={species} />
              <PokemonDetails pokemon={pokemon} species={species} loading={loading} onVarietySelect={selectVariety} />
            </section>

            <div className={`message${isError ? ' message--error' : ''}`} role="status" aria-live="polite">
              {message}
            </div>
          </div>
        </main>

        <footer className="footer">
          <span>✦ HECHO PARA EXPLORAR ✦</span>
          <span>DATOS: POKÉAPI</span>
          <span>DSAW · 2026-2</span>
        </footer>
      </div>
    </>
  );
}
