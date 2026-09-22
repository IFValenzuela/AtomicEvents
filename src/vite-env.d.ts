/// <reference types="vite/client" />

/*
 * Tipos que aporta Vite: importar .css, .svg, .png y demás archivos que no
 * son TypeScript, más import.meta.env.
 *
 * Sin este archivo el editor marca en rojo los `import './styles/app.css'`
 * de main.tsx con el error TS2307, aunque `npm run build` funcione.
 */
