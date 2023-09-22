/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			screens: {
				tall: { raw: "(max-height: 800px)" },
				// => @media (min-height: 800px) { ... }
			},
			boxShadow: {
				innerCustom: "inset 0 0 5px black",
				outerCustom: "0 0 10px 1000px rgba(0,0,0,.5)",
				normalButton: "0 0 10px black",
				pressedButton: "0 0 10px black",
			},
		},
	},
	plugins: [],
};
