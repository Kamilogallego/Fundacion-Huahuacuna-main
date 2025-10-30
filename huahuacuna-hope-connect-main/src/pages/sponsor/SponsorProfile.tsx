// Importación de componentes reutilizables y librerías necesarias
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Tarjetas del sistema UI
import { useAuth } from '@/contexts/AuthContext'; // Contexto de autenticación del usuario
import { Heart, DollarSign, Calendar, User } from 'lucide-react'; // Íconos decorativos de la librería lucide-react

// Componente principal del perfil del padrino
const SponsorProfile = () => {
  // Obtiene los datos del usuario autenticado desde el contexto global
  const { user } = useAuth();

  // Datos estadísticos que se muestran en la parte superior del perfil
  const stats = [
    {
      label: 'Niños Apadrinados', // Descripción de la estadística
      value: '2', // Valor que se mostrará
      icon: Heart, // Ícono representativo
      color: 'text-accent', // Color personalizado
    },
    {
      label: 'Total Donado',
      value: '$850.000',
      icon: DollarSign,
      color: 'text-success',
    },
    {
      label: 'Última Donación',
      value: '15 Ene 2025',
      icon: Calendar,
      color: 'text-primary',
    },
  ];

  return (
    <div>
      {/* Encabezado del perfil */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Bienvenido/a de nuevo, {user?.name} {/* Muestra el nombre del usuario si está autenticado */}
        </p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon; // Asigna el ícono correspondiente
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    {/* Etiqueta y valor de la estadística */}
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <h3 className="font-heading font-bold text-2xl">{stat.value}</h3>
                  </div>
                  {/* Ícono decorativo con color dinámico */}
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sección inferior: información personal y actividad reciente */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tarjeta de información personal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> {/* Ícono del usuario */}
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Nombre del usuario */}
            <div>
              <p className="text-sm text-muted-foreground">Nombre</p>
              <p className="font-semibold">{user?.name}</p>
            </div>
            {/* Correo electrónico */}
            <div>
              <p className="text-sm text-muted-foreground">Correo Electrónico</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            {/* Estado del padrino */}
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <p className="font-semibold text-success">Apadrinador Aprobado ✓</p>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {/* Lista de actividades con indicadores de color */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" /> {/* Punto verde */}
              <p className="text-muted-foreground">
                Donación de $50.000 procesada
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" /> {/* Punto amarillo */}
              <p className="text-muted-foreground">
                Nuevo apadrinamiento iniciado
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" /> {/* Punto azul */}
              <p className="text-muted-foreground">
                Perfil actualizado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Exporta el componente para que pueda ser utilizado en otras partes del proyecto
export default SponsorProfile;
