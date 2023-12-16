/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
    "./vendor/tales-from-a-dev/flowbite-bundle/templates/**/*.html.twig",
  ],
  theme: {
    extend: {
      'width': {
        '20px': '20px',
      }
    },
  },
  plugins: [],
}
