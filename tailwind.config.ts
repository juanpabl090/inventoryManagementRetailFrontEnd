import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - Azul: es el color base para acciones principales y branding
        primary: {
          50: "#eff6ff", // muy claro, ideal para fondos suaves o hover en elementos muy sutiles
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Color principal para botones, enlaces y elementos activos
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554", // oscuro, para textos destacados sobre fondo claro
        },
        // Success colors - Verde, para estados exitosos, confirmaciones, mensajes de éxito
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981", // color para indicadores de éxito, textos o iconos que indican "OK"
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        // Warning colors - Naranja, para alertas o estados de precaución
        warning: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316", // color para advertencias o llamados a atención
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        // Error colors - Rojo, para errores, mensajes críticos, invalidaciones
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444", // color para errores visibles, alertas o mensajes de error
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        // Neutral grays - grises para textos, fondos, bordes, separadores, etc.
        neutral: {
          50: "#fafafa", // fondo muy claro o fondo de secciones secundarias
          100: "#f5f5f5",
          200: "#e5e5e5", // borde suave o fondo de tarjetas
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373", // texto párrafo o texto secundario
          600: "#525252", // texto primario
          700: "#404040", // títulos h3 o texto destacado
          800: "#262626", // títulos h2 o textos importantes
          900: "#171717", // títulos h1 o textos muy destacados
          950: "#0a0a0a", // textos muy oscuros o para modo oscuro
        },
      },
      fontFamily: {
        sans: ["  boto", "sans-serif"], // Fuente base para toda la app, moderna y legible
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }], // texto pequeño o labels
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // texto secundario o descripciones
        base: ["1rem", { lineHeight: "1.5rem" }], // texto normal, párrafos
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // texto destacado o subheaders
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // títulos h4 o destacados
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // títulos h3
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // títulos h2
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // títulos h1
        "5xl": ["3rem", { lineHeight: "1" }], // encabezados principales grandes (landing, banners)
        "6xl": ["3.75rem", { lineHeight: "1" }], // encabezados extra grandes (hero)
      },
      spacing: {
        "18": "4.5rem", // para márgenes/padding personalizados, ejemplo: spacing-y-18
        "88": "22rem", // para anchos o altos grandes, contenedores o secciones
        "128": "32rem", // grandes separaciones o layouts de página
      },
      borderRadius: {
        xl: "0.75rem", // para botones y cajas suaves, redondeo medio
        "2xl": "1rem", // para tarjetas o modales con esquinas más redondeadas
        "3xl": "1.5rem", // para elementos destacados o modales grandes, estilo moderno y suave
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)", // sombra muy sutil para inputs, botones pequeños
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", // sombra estándar para elementos básicos
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // sombra media para tarjetas o menús flotantes
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", // sombra para elementos importantes o modales
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", // sombra profunda para héroes o destacados
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)", // sombra muy fuerte para overlays y modales grandes
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)", // sombra interna para efectos sutiles en inputs
        card: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // sombra recomendada para tarjetas por defecto
        "card-hover":
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", // sombra para tarjetas al hacer hover, sutil pero perceptible
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out", // animación para aparición suave de elementos
        "slide-in": "slideIn 0.3s ease-out", // animación para menú o contenido que entra deslizando
        "bounce-subtle": "bounceSubtle 0.6s ease-in-out", // animación de rebote sutil, útil para llamadas a acción
        "pulse-subtle": "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", // animación de pulso para resaltar elementos importantes
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      backdropBlur: {
        xs: "2px", // efecto blur ligero para fondos traslúcidos o modales
      },
      screens: {
        // Móviles pequeños (ej: Galaxy Fold)
        xs: "320px",
        // Móviles estándar
        sm: "480px",
        // Tablets pequeñas (ej: iPad Mini en portrait)
        md: "768px",
        // Tablets grandes/pequeños laptops (ej: iPad Pro 11")
        lg: "1024px",
        // Laptops/desktops estándar
        xl: "1280px",
        // Pantallas grandes (monitores HD)
        "2xl": "1536px",
        // Pantallas extra grandes (4K/QHD)
        "3xl": "1920px",
        // Super pantallas (ej: ultra wide)
        "4xl": "2560px",

        // Breakpoints personalizados por altura (útil para layouts verticales)
        "h-sm": { raw: "(min-height: 640px)" },
        "h-md": { raw: "(min-height: 768px)" },

        // Breakpoints para orientación
        portrait: { raw: "(orientation: portrait)" },
        landscape: { raw: "(orientation: landscape)" },

        // Breakpoints específicos para dispositivos
        "iphone-se": "375px", // iPhone SE/6/7/8
        "iphone-x": "812px", // iPhone X/11 Pro
        "ipad-mini": "768px", // iPad Mini
        "surface-duo": "540px", // Microsoft Surface Duo
      },
    },
  },
};

export default config;
