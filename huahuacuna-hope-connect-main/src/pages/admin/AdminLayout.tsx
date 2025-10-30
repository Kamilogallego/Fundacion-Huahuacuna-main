// Importaciones necesarias
import { Outlet, Link, useLocation } from 'react-router-dom'; // Manejo de rutas y ubicación actual
import { useAuth } from '@/contexts/AuthContext'; // Contexto de autenticación (usuario logueado y logout)
import { Button } from '@/components/ui/button'; // Botón personalizado del sistema UI
import { LayoutDashboard, Users, Heart, Database, LogOut } from 'lucide-react'; // Íconos del panel
import logo from '@/assets/logo-huahuacuna.png'; // Logo de la fundación

// Componente principal del layout del panel de administración
const AdminLayout = () => {
  // Extrae el usuario actual y la función para cerrar sesión del contexto
  const { user, logout } = useAuth();

  // Obtiene la ubicación actual del navegador (sirve para resaltar el botón activo)
  const location = useLocation();

  // Lista de secciones disponibles en el panel de administración
  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/solicitudes', label: 'Solicitudes', icon: Users },
    { path: '/admin/ninos', label: 'Catálogo de Niños', icon: Heart },
    { path: '/admin/apadrinamientos', label: 'Apadrinamientos', icon: Database },
  ];

  return (
    // Contenedor principal con disposición horizontal (sidebar + contenido)
    <div className="min-h-screen flex">
      
      {/* ----- SIDEBAR LATERAL ----- */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col">
        
        {/* Encabezado con logo y título del panel */}
        <div className="p-6 border-b border-primary-foreground/20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Fundación Huahuacuna" className="h-10 w-auto" />
            <span className="font-heading font-bold text-lg">Admin Panel</span>
          </Link>
        </div>

        {/* Navegación lateral (lista de botones con íconos) */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon; // Asigna el icono correspondiente
            const isActive = location.pathname === item.path; // Verifica si la ruta actual coincide

            return (
              // Enlace hacia la ruta del ítem del menú
              <Link key={item.path} to={item.path}>
                <Button
                  // Usa un color diferente si está activo
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-2 ${
                    !isActive &&
                    'text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                >
                  {/* Ícono del botón */}
                  <Icon className="h-4 w-4" />
                  {/* Texto del botón */}
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Sección inferior del sidebar con info del usuario y botón de cerrar sesión */}
        <div className="p-4 border-t border-primary-foreground/20">
          <div className="mb-3 px-3 py-2">
            <p className="text-sm opacity-75">Conectado como:</p>
            {/* Muestra el nombre del usuario logueado */}
            <p className="font-semibold">{user?.name}</p>
          </div>

          {/* Botón para cerrar sesión */}
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start gap-2 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* ----- CONTENIDO PRINCIPAL ----- */}
      <main className="flex-1 bg-muted">
        <div className="container mx-auto px-6 py-8">
          {/* Aquí se renderizan las subrutas (Dashboard, Solicitudes, etc.) */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Exporta el layout para usarlo en las rutas de administración
export default AdminLayout;
