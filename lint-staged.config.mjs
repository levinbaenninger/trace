/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": ["bun fix"],
};

export default config;
