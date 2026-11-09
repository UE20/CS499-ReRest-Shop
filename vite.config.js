// Settings for Vite, the tool that runs and builds the React app.

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// base is the repo name, so the site works on GitHub Pages:
// https://ue20.github.io/CS499-ReRest-Shop/
export default defineConfig({
  plugins: [react()],
  base: '/CS499-ReRest-Shop/',
});
