// Importa el hook `useLocation` de react-router-dom para obtener información sobre la ruta actual.
import { useLocation } from "react-router-dom";
// Importa `useEffect` de React para ejecutar efectos secundarios cuando cambian dependencias.
import { useEffect } from "react";

// Componente funcional `NotFound` que se muestra cuando el usuario intenta acceder a una ruta inexistente.
const NotFound = () => {
  // Obtiene la información de la ubicación actual (por ejemplo, el path que el usuario intentó abrir).
  const location = useLocation();

  // Hook que se ejecuta cada vez que cambia la ruta (`location.pathname`).
  // Se usa para registrar un mensaje de error en la consola con la ruta no encontrada.
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]); // Dependencia: se ejecuta cuando cambia el path.

  // Retorna el contenido visual del componente.
  return (
    // Contenedor principal que ocupa toda la altura de la pantalla y centra el contenido
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Contenedor del mensaje de error */}
      <div className="text-center">
        {/* Título principal con el código 404 */}
        <h1 className="mb-4 text-4xl font-bold">404</h1>

        {/* Mensaje descriptivo del error */}
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>

        {/* Enlace para volver al inicio */}
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

// Exporta el componente para que pueda ser usado en otras partes del proyecto.
export default NotFound;
