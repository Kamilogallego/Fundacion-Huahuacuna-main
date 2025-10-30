// Importamos componentes y hooks necesarios
import { Link, useNavigate } from 'react-router-dom'; // 'Link' permite navegación sin recargar la página. 'useNavigate' permite redirigir programáticamente.
import { Button } from '@/components/ui/button'; // Importamos el componente de botón personalizado.
import { useAuth } from '@/contexts/AuthContext'; // Importamos el contexto de autenticación para acceder al usuario actual y las funciones de login/logout.
import { Heart, LogOut, User } from 'lucide-react'; // Iconos utilizados en la barra (usuario, salir, corazón).
import logo from '@/assets/logo-huahuacuna.png'; // Importamos el logo de la fundación.

// Definimos el componente Navbar.
export const Navbar = () => {
  // Extraemos el usuario actual y la función de cierre de sesión del contexto de autenticación.
  const { user, logout } = useAuth();

  // Hook para redirigir a diferentes rutas.
  const navigate = useNavigate();

  // Función que maneja el clic del botón de autenticación.
  // Si el usuario está logueado, lo redirige según su rol.
  // Si no lo está, lo lleva al inicio de sesión.
  const handleAuthClick = () => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard'); // Redirige al panel del administrador
      } else {
        navigate('/apadrinador/catalogo'); // Redirige al catálogo de niños para apadrinadores
      }
    } else {
      navigate('/login'); // Si no hay usuario autenticado, lleva al login
    }
  };

  // Retornamos la estructura visual de la barra de navegación.
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Contenedor principal centrado y con espaciado */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Sección izquierda: logo + nombre */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Fundación Huahuacuna" className="h-12 w-auto" />
            <span className="font-heading font-bold text-xl text-blue-900 hidden md:inline">
              Fundación Huahuacuna
            </span>
          </Link>

          {/* Sección central: enlaces de navegación (visibles solo en pantallas medianas en adelante) */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/apadrina" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
              Apadrina
            </Link>
            <Link to="/donaciones" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
              Donaciones
            </Link>
            <Link to="/voluntariado" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
              Voluntariado
            </Link>
            <Link to="/bitacora" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
              Bitácora
            </Link>
            <Link to="/proyectos" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
              Proyectos
            </Link>
            <Link to="/eventos" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
              Eventos
            </Link>
          </div>

          {/* Sección derecha: botones de usuario */}
          <div className="flex items-center gap-3">
            {/* Si el usuario está autenticado, muestra su nombre y un botón para cerrar sesión */}
            {user ? (
              <>
                {/* Botón para ir al panel según su rol */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAuthClick}
                  className="gap-2"
                >
                  <User className="h-4 w-4" />
                  {user.name}
                </Button>

                {/* Botón para cerrar sesión */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-2 text-blue-900 hover:text-yellow-600 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  Salir
                </Button>
              </>
            ) : (
              // Si el usuario NO está autenticado, muestra opciones para iniciar sesión o registrarse
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  Iniciar Sesión
                </Button>

                <Button
                  size="sm"
                  onClick={() => navigate('/registro-apadrinador')}
                  className="gap-2 bg-yellow-600 text-white hover:bg-yellow-700 border-0"
                >
                  <Heart className="h-4 w-4" />
                  Apadrinar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
