module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./form renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#40A9FF",
        primary_200: "#deeaff",
        icon_dark_grey: "#61656f",
        icon_light_grey: "#8292ac",
        text_grey_1: "#61656c",
        bg_grey_3: "#d2ddec",
        text_grey_2: "#a1a3a8",
        primary_drawer_icon: "#0565ff",
        light_yes_no: "#EEF3F8",
        error_box_bg: "#EEF3F9",
      },
    },
  },
  plugins: [],
};
