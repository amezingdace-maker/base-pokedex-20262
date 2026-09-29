# Pokédex DSAW

**Autor:** David Fernando Gómez

**Sitio desplegado:** https://amezingdace-maker.github.io/base-pokedex-20262/

Pokédex retro hecha con React, TypeScript y Vite. Consulta [PokéAPI](https://pokeapi.co/) por nombre, número o forma, y muestra tipos, habilidades, estadísticas y variantes. Los paisajes y animaciones cambian según el tipo del Pokémon.

## Ejecutar en el computador

Se necesita Node.js y npm.

```bash
npm install
npm run dev
```

Abre la dirección local que muestra Vite en la terminal. Para comprobar que el proyecto compila:

```bash
npm run build
```

## Archivos principales

- `index.html`: punto de entrada con `#root`.
- `src/main.tsx`: monta `App` con `createRoot` y `StrictMode`.
- `src/App.tsx`: componentes de la interfaz, escena, ficha y formulario.
- `src/hooks/usePokemonSearch.ts`: estado, búsqueda y control de solicitudes.
- `packages/pokedex-core/`: librería local `@retro-dex/core`, independiente de React, para PokéAPI, nombres, tipos y sprites.
- `src/styles.css`: paisaje retro, diseño adaptable y animaciones.
- `AI-LOG.md`: registro del uso de IA durante el desarrollo.
- `INFORME-IA.md`: borrador editable del informe sobre el uso de IA.

Las fuentes y los datos de PokéAPI requieren conexión a internet. La librería local cubre la opción de crear una propia; las notas de clase no precisan si el profesor esperaba además utilizar o publicar otra librería.
