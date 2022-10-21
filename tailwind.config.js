module.exports = {
    daisyui: {
      themes: ["winter", "night"]
    },
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    safelist: [
      // for align col in appTable
      '!text-center',
      '!text-left',
      '!text-right',
      '!text-end',
      '!text-start',
      '!text-justify',

      // for bg color on founded col
      '!bg-primary',
      '!bg-secondary',
      '!bg-accent',
      '!bg-neutral',
      '!bg-info',
      '!bg-success',
      '!bg-warning',
      '!bg-error',

      '!rounded-none'
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