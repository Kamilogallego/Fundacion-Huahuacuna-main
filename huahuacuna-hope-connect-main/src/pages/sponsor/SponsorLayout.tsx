// Importación de dependencias necesarias
import { Outlet, Link, useLocation } from 'react-router-dom'; // Manejo de rutas, enlaces y detección de ruta activa
import { useAuth } from '@/contexts/AuthContext'; // Contexto global de autenticación
import { Button } from '@/components/ui/button'; // Componente de botón reutilizable
import { User, Heart, DollarSign, History, LogOut } from 'lucide-react'; // Íconos SVG de la librería lucide-react
import logo from '@/assets/logo-huahuacuna.png'; // Logo de la fundación

// Componente principal que define el layout del panel del padrino (Sponsor)
const SponsorLayout = () => {
  const { user, logout } = useAuth(); // Obtiene los datos del usuario autenticado y la función para cerrar sesión
  const location = useLocation(); // Obtiene la ubicación actual para identificar la ruta activa

  // Menú lateral con sus rutas, etiquetas e íconos
  const menuItems = [
    { path: '/apadrinador/perfil', label: 'Mi Perfil', icon: User },
    { path: '/apadrinador/catalogo', label: 'Niños', icon: Heart },
    { path: '/donaciones', label: 'Donaciones', icon: DollarSign },
    { path: '/apadrinador/historial', label: 'Historial', icon: History },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar lateral izquierdo */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col">
        {/* Sección superior del sidebar con logo y título */}
        <div className="p-6 border-b border-primary-foreground/20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Fundación Huahuacuna" className="h-10 w-auto" /> {/* Logo */}
            <span className="font-heading font-bold text-lg">Padrino</span> {/* Texto del encabezado */}
          </Link>
        </div>

        {/* Navegación del menú principal */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon; // Asigna el ícono correspondiente
            const isActive = location.pathname === item.path; // Determina si la ruta actual coincide con el ítem
            return (
              <Link key={item.path} to={item.path}>
                {/* Botón del menú: cambia de estilo si está activo o no */}
                <Button
                  variant={isActive ? 'secondary' : 'ghost'} // Si está activa, aplica el estilo "secondary"
                  className={`w-full justify-start gap-2 ${
                    !isActive &&
                    'text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                >
                  {/* Ícono + texto del botón */}
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Sección inferior del sidebar: información del usuario y botón de cierre de sesión */}
        <div className="p-4 border-t border-primary-foreground/20">
          <div className="mb-3 px-3 py-2">
            <p className="text-sm opacity-75">Conectado como:</p>
            <p className="font-semibold">{user?.name}</p> {/* Muestra el nombre del usuario */}
          </div>

          {/* Botón para cerrar sesión */}
          <Button
            variant="ghost"
            onClick={logout} // Ejecuta la función logout al hacer clic
            className="w-full justify-start gap-2 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Contenedor principal del contenido dinámico */}
      <main className="flex-1 bg-muted">
        <div className="container mx-auto px-6 py-8">
          <Outlet /> {/* Aquí se renderiza el contenido de cada ruta hija */}
        </div>
      </main>
    </div>
  );
};

// Exporta el layout para ser usado como estructura principal en rutas de padrino
export default SponsorLayout;
