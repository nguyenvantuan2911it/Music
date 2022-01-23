module.exports = {
  important: true,
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        368: '23rem',
        123: '30.875rem',
        752: '47rem',
        136: '34rem',
        182: '43.375rem',
        111: '27.75rem',
      },
      width: {
        368: '23rem',
        560: '35rem',
        816: '51rem',
        104: '26rem',
        160: '40rem',
        188: '47rem',
        115:'28.75rem',
        284:'71rem',
        37.5:'9.375rem'
      },
    },
    screens: {
      tablet: '600px',
      // => @media (min-width: 660px) { ... }
      ipad: '768px',
      // => @media (min-width: 768px) { ... }
      custom: '1020px',
      // => @media (min-width: 1018) { ... }
      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }
      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
