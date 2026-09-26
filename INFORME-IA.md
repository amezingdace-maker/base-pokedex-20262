# Informe sobre el uso de inteligencia artificial en la Pokédex

**Proyecto:** Pokédex DSAW · 2026-2

**Estudiante:** David
**Estado:** borrador para revisar y adaptar antes de entregar

## Objetivo

Desarrollar una Pokédex con React que permita buscar Pokémon y consultar sus datos. El diseño elegido para este proyecto es retro y nostálgico, con paisajes pixelados y escenarios animados según el tipo del Pokémon.

## Cómo se utilizó la IA

Se utilizó Codex como apoyo para programar y revisar el proyecto. El estudiante indicó la dirección visual y pidió conservar la búsqueda, los escenarios animados y las formas especiales. Codex ayudó a construir la versión inicial con HTML, CSS y JavaScript, y después a migrarla a React y TypeScript.

Durante la migración, Codex propuso componentes para la escena, la ficha y el formulario; trasladó el manejo de las búsquedas a un hook con `useState` y `useEffect`; y organizó en una librería local las funciones relacionadas con PokéAPI, los nombres, los tipos y los sprites. También preparó este informe y el registro `AI-LOG.md`.

La IA no proporcionó una rúbrica oficial del profesor. Las notas usadas como referencia mencionan React, una librería, un informe de IA y la estructura de entrada con `#root`, `/src/main.tsx`, `createRoot` y `StrictMode`. El alcance exacto de la condición sobre la librería no está especificado en esas notas; el proyecto incluye una librería local propia llamada `@retro-dex/core`.

## Decisiones y revisión

El estudiante pidió la estética inspirada en videojuegos antiguos, los fondos animados por tipo y las variantes como Charizard Mega X. Codex implementó esas ideas; el estudiante debe revisar el código y el resultado visual antes de presentarlo como trabajo final.

La IA puede introducir errores o interpretar mal una indicación. Por eso se revisó la compilación con `npm run build` y se probó en el navegador la carga de Pikachu, la búsqueda de Charizard Mega X y el cambio a Mega Y. También se comprobó una pantalla estrecha y, en esa prueba, no hubo desplazamiento horizontal ni errores de consola. Estas comprobaciones no sustituyen una revisión final del estudiante.

## Fuentes de datos y límites

Los datos y sprites se consultan mediante [PokéAPI](https://pokeapi.co/). Las tipografías se cargan desde Google Fonts. La Pokédex necesita conexión a internet para mostrar esos recursos. El código fuente se prepara en un fork del repositorio base de DSAW.

## Reflexión personal del estudiante

_Completar con palabras propias antes de entregar: ¿qué aprendí sobre componentes, estado, efectos y librerías? ¿Qué decisiones cambié después de revisar el resultado de Codex? ¿Qué pruebas hice yo personalmente?_
