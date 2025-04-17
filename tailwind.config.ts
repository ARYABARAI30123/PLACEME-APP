import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0E7490',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: '#10B981',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#E5E7EB',
					foreground: '#6B7280'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				text: {
					DEFAULT: '#1F2937',
					subtle: '#6B7280'
				},
				teal: {
					DEFAULT: '#098577',
					light: '#43A49B',
					dark: '#076C60',
					50: '#E6F5F3',
					100: '#BFEAE5',
					200: '#99DFD7',
					300: '#73D4C9',
					400: '#4DCABC',
					500: '#26BFAE',
					600: '#1F9A8D',
					700: '#17746C',
					800: '#0F4E4A',
					900: '#082928'
				},
				seagreen: {
					DEFAULT: '#2E8B57',
					light: '#5CAB7E',
					dark: '#236A42',
					50: '#EAF4EF',
					100: '#C5E3D4',
					200: '#A0D1B9',
					300: '#7BBF9E',
					400: '#56AE83',
					500: '#3D9C68',
					600: '#327D54',
					700: '#275E40',
					800: '#1B3F2C',
					900: '#0E1F16'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				custom: {
					primary: {
						DEFAULT: '#E76F51',
						light: '#F4A261',
						dark: '#9A5B38',
						50: '#FFF3E0',
						100: '#FFE0B2',
						200: '#FFCC80',
						300: '#FFB74D',
						400: '#FFA726',
						500: '#FF9800',
						600: '#FB8C00',
						700: '#F57C00',
						800: '#EF6C00',
						900: '#E65100'
					},
					secondary: {
						DEFAULT: '#2A9D8F',
						light: '#57C5B6',
						dark: '#1F7A6C',
						50: '#E9F5DB',
						100: '#B7E4C7',
						200: '#95D5B2',
						300: '#74C69D',
						400: '#52B788',
						500: '#40916C',
						600: '#2D6A4F',
						700: '#1B4332',
						800: '#081C15',
						900: '#040D0A'
					},
					accent: {
						DEFAULT: '#F4A261',
						light: '#FFD166',
						dark: '#E76F51'
					}
				},
				aesthetic: {
					primary: {
						DEFAULT: '#5D4037',
						light: '#8D6E63',
						dark: '#3E2723',
						50: '#EFEBE9',
						100: '#D7CCC8',
						200: '#BCAAA4',
						300: '#A1887F',
						400: '#8D6E63',
						500: '#795548',
						600: '#6D4C41',
						700: '#5D4037',
						800: '#4E342E',
						900: '#3E2723'
					},
					secondary: {
						DEFAULT: '#2E7D32',
						light: '#4CAF50',
						dark: '#1B5E20',
						50: '#E8F5E9',
						100: '#C8E6C9',
						200: '#A5D6A7',
						300: '#81C784',
						400: '#66BB6A',
						500: '#4CAF50',
						600: '#43A047',
						700: '#388E3C',
						800: '#2E7D32',
						900: '#1B5E20'
					},
					accent: {
						DEFAULT: '#FFA000',
						light: '#FFCA28',
						dark: '#FF6F00',
						50: '#FFF3E0',
						100: '#FFE0B2',
						200: '#FFD54F',
						300: '#FFC107',
						400: '#FFCA28',
						500: '#FFA000',
						600: '#FF8F00',
						700: '#FF6F00'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-in': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' }
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-light': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'pulse-light': 'pulse-light 1.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
