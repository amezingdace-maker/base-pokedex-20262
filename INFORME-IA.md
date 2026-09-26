# Informe sobre el uso de inteligencia artificial en la Pokédex

**Proyecto:** Pokédex DSAW · 2026-2

**Estudiante:** David


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

Los datos y sprites se consultan mediante [PokéAPI](https://pokeapi.co/). Las tipografías se cargan desde Google Fonts. La Pokédex necesita conexión a internet para mostrar esos recursos. El código fuente se publicó en un fork del repositorio base de DSAW.

## Reflexión personal del estudiante

Al principio no tenía muy claro para qué servía React. Incluso pensé que podía ser otro lenguaje. Con este proyecto entendí que sigo trabajando con JavaScript, pero que React me ayuda a dividir la interfaz en componentes y a actualizar lo que aparece en pantalla cuando cambian los datos. También entendí mejor para qué sirven `useState` y `useEffect`: uno guarda el estado de la búsqueda y el otro ayuda a cargar y sincronizar la información de los Pokémon. La librería local nos permitió separar esa lógica de la parte visual.

La idea de que la Pokédex se sintiera antigua y nostálgica fue mía. Quería algo que recordara a juegos antiguos como Zelda y Mario, con paisajes pixelados, colores retro y escenarios distintos para cada tipo de Pokémon. No salió todo perfecto a la primera: al hacer cambios en el diseño llegué a notar que faltaban formas especiales, como las variantes de Charizard, y pedí que se corrigiera. Eso me mostró que una pantalla puede verse bien y aun así haber perdido una función importante.

Codex me ayudó a construir y migrar el proyecto, y también a revisar la compilación y algunas búsquedas. Yo fui mirando el resultado en el navegador, dando indicaciones sobre la estética y señalando lo que no aparecía como esperaba. Me llevo la idea de que usar IA puede ahorrar tiempo, pero no reemplaza entender qué hace el código ni comprobar que la aplicación cumple lo que uno quería hacer.
