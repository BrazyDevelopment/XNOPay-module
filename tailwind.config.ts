import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const plugin = require('tailwindcss/plugin');
const { blackA, mauve, violet, indigo, purple, yellow, sky } = require('@radix-ui/colors');
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px',
  			lg: '1080px',
  			md: '720px',
  			sm: '640px'
  		}
  	},
  	extend: {
		colors: {

		},
  		boxShadow: {
  			input: '`0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`'
  		},
  		keyframes: {
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			enterFromRight: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(200px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			enterFromLeft: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(-200px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			exitToRight: {
  				from: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				},
  				to: {
  					opacity: '0',
  					transform: 'translateX(200px)'
  				}
  			},
  			exitToLeft: {
  				from: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				},
  				to: {
  					opacity: '0',
  					transform: 'translateX(-200px)'
  				}
  			},
  			scaleIn: {
  				from: {
  					opacity: '0',
  					transform: 'rotateX(-10deg) scale(0.9)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'rotateX(0deg) scale(1)'
  				}
  			},
  			scaleOut: {
  				from: {
  					opacity: '1',
  					transform: 'rotateX(0deg) scale(1)'
  				},
  				to: {
  					opacity: '0',
  					transform: 'rotateX(-10deg) scale(0.95)'
  				}
  			},
  			fadeIn: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			fadeOut: {
  				from: {
  					opacity: '1'
  				},
  				to: {
  					opacity: '0'
  				}
  			},
  			shimmer: {
  				from: {
  					'backgroundPosition': '0 0'
  				},
  				to: {
  					'backgroundPosition': '-200% 0'
  				}
  			},
  			moveHorizontal: {
  				'0%': {
  					transform: 'translateX(-50%) translateY(-10%)'
  				},
  				'50%': {
  					transform: 'translateX(50%) translateY(10%)'
  				},
  				'100%': {
  					transform: 'translateX(-50%) translateY(-10%)'
  				}
  			},
  			moveInCircle: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'50%': {
  					transform: 'rotate(180deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			moveVertical: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'50%': {
  					transform: 'translateY(50%)'
  				},
  				'100%': {
  					transform: 'translateY(-50%)'
  				}
  			},
  			spotlight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate(-72%, -62%) scale(0.5)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate(-50%,-40%) scale(1)'
  				}
  			}
  		},
  		animation: {
  			spotlight: 'spotlight 2s ease .75s 1 forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			scaleIn: 'scaleIn 200ms ease',
  			scaleOut: 'scaleOut 200ms ease',
  			fadeIn: 'fadeIn 200ms ease',
  			fadeOut: 'fadeOut 200ms ease',
  			enterFromLeft: 'enterFromLeft 250ms ease',
  			enterFromRight: 'enterFromRight 250ms ease',
  			exitToLeft: 'exitToLeft 250ms ease',
  			exitToRight: 'exitToRight 250ms ease',
  			shimmer: 'shimmer 2s linear infinite',
  			first: 'moveVertical 30s ease infinite',
  			second: 'moveInCircle 20s reverse infinite',
  			third: 'moveInCircle 40s linear infinite',
  			fourth: 'moveHorizontal 40s ease infinite',
  			fifth: 'moveInCircle 20s ease infinite',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    addVariablesForColors,
      require("tailwindcss-animate")
],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#00a2ff",
          "secondary": "#ffffff",
          "accent": "#b24ced",
          "neutral": "#3b3a3a",
          "base-100": "#ffffff",
        },
      },
      {
        dark: {
          "primary": "#00a2ff",
          "secondary": "#ffffff",
          "accent": "#b24ced",
          "neutral": "#fff",
          "base-100": "#0a0a0a",
        },
      },
      "cupcake",
      {
        bumblebee: {
          "primary": "#ffd900",
          "secondary": "#000000",
          "accent": "#8f4c00",
          "neutral": "#3b3a3a",
          "base-100": "#0a0a0a",
        },
      },
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ]
  },
};

export default config;
