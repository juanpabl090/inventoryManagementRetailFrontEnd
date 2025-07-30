import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-neutral-900 font-sans p-4 sm:p-6 lg:p-8">
      {/* Contenedor principal para centrar el contenido y aplicar estilos de tarjeta */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-16 text-center max-w-lg w-full animation-fade-in">
        {/* Icono de error */}
        <div className="mb-6 flex justify-center text-error-500">
          <Frown size={80} className="sm:size-24 lg:size-32" />
        </div>

        {/* Título principal 404 */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-primary-600 mb-4 leading-none">
          404
        </h1>

        {/* Mensaje de página no encontrada */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-4">
          Página No Encontrada
        </h2>

        {/* Descripción del error */}
        <p className="text-base sm:text-lg text-neutral-500 mb-8 leading-relaxed">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Podría
          haberse movido o eliminado.
        </p>

        {/* Botón para regresar al inicio */}
        <a
          href="/" // En una aplicación real de React, usarías un componente de enrutamiento como <Link to="/">
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Volver al Inicio
        </a>
      </div>

      {/* Pie de página sutil */}
      <footer className="mt-10 text-neutral-400 text-sm">
        © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
      </footer>
    </div>
  );
}
