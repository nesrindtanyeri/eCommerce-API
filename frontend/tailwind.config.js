module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          100: '#F3EDC8', // Beyaz yerine istediğiniz renk tonu.
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#E6D385",
          secondary: "#5C7658",
          accent: "#681313",
          neutral: "#D25959",
          "base-100": "#F3EDC8", // Varsayılan arka plan rengini değiştirin.
        },
      },
    ],
  },
};
