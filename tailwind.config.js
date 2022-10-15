module.exports = {
    daisyui: {
      themes: ["winter", "night"]
    },
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extends: {
        screens: {
          'sm': '540px', 
          'md': '720px',
          'lg': '960px',
          'xl': '1140px',
        },
      },
    },
    plugins: [
      require("daisyui"),
      require('tailwind-bootstrap-grid')({
        containerMaxWidths: { sm: '540px', md: '720px', lg: '960px', xl: '1140px' },
      }),  
    ],
}