// Importa los componentes de interfaz de usuario reutilizables
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Importa íconos desde la librería lucide-react para representar visualmente datos
import { Users, Heart, DollarSign, UserCheck } from 'lucide-react';
// Importa Link para la navegación interna sin recargar la página
import { Link } from 'react-router-dom';
// Importa el componente de botón estilizado del sistema UI
import { Button } from '@/components/ui/button';

// Componente principal del panel de administración
const AdminDashboard = () => {

  // Datos estadísticos que se mostrarán en tarjetas
  const stats = [
    {
      title: 'Solicitudes Pendientes', // Título de la tarjeta
      value: '3', // Valor numérico o dato
      icon: UserCheck, // Ícono representativo
      color: 'text-secondary', // Color del ícono
      link: '/admin/solicitudes', // Enlace a la sección correspondiente
    },
    {
      title: 'Niños Activos',
      value: '6',
      icon: Heart,
      color: 'text-accent',
      link: '/admin/ninos',
    },
    {
      title: 'Apadrinadores',
      value: '5',
      icon: Users,
      color: 'text-success',
      link: '/admin/apadrinamientos',
    },
    {
      title: 'Total Donaciones',
      value: '$2.5M',
      icon: DollarSign,
      color: 'text-primary',
      link: '/admin/apadrinamientos',
    },
  ];

  return (
    <div>
      {/* Encabezado del dashboard */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">
          Panel de Administración
        </h1>
        <p className="text-muted-foreground">
          Bienvenido al sistema de gestión de Fundación Huahuacuna
        </p>
      </div>

      {/* Sección de estadísticas rápidas (tarjetas con datos) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon; // Asigna el icono correspondiente a la variable Icon
          return (
            // Cada tarjeta muestra un indicador del panel
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  {/* Texto con título y valor */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <h3 className="font-heading font-bold text-3xl">
                      {stat.value}
                    </h3>
                  </div>

                  {/* Ícono asociado a la estadística */}
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>

                {/* Enlace para ver detalles de esa estadística */}
                <Link to={stat.link}>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Ver detalles →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Segunda sección del dashboard: Acciones rápidas y actividad reciente */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Tarjeta: Acciones rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Botones que llevan a diferentes secciones administrativas */}
            <Link to="/admin/ninos">
              <Button variant="outline" className="w-full justify-start">
                Agregar Nuevo Niño
              </Button>
            </Link>
            <Link to="/admin/solicitudes">
              <Button variant="outline" className="w-full justify-start">
                Revisar Solicitudes
              </Button>
            </Link>
            <Link to="/admin/apadrinamientos">
              <Button variant="outline" className="w-full justify-start">
                Ver Apadrinamientos
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Tarjeta: Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            
            {/* Lista de eventos recientes con indicadores de color */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <p className="text-muted-foreground">
                Nueva solicitud de apadrinamiento recibida
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <p className="text-muted-foreground">
                Donación de $50.000 procesada
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <p className="text-muted-foreground">
                Nuevo niño agregado al catálogo
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Exporta el componente para ser usado en las rutas del panel
export default AdminDashboard;
