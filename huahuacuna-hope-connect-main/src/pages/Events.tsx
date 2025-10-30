// Importa el componente "Card" y "CardContent" para crear tarjetas visuales con estilos uniformes
import { Card, CardContent } from '@/components/ui/card';

// Importa el componente "Badge" para mostrar etiquetas con estilos (por ejemplo, "Próximo")
import { Badge } from '@/components/ui/badge';

// Importa íconos desde la librería lucide-react
import { Calendar, MapPin, Clock } from 'lucide-react';

// Importa una imagen predeterminada (foto de grupo de niños)
import childrenGroup from '@/assets/children-group.jpg';

// Datos simulados (mock) de eventos próximos
// En una app real, estos datos podrían venir de una base de datos o API
const mockEvents = [
  {
    id: '1',
    title: 'Festival de Talentos 2025', // Título del evento
    date: '2025-11-5', // Fecha del evento
    time: '10:00 AM', // Hora del evento
    location: 'Centro Comunitario Huahuacuna', // Lugar del evento
    description: 'Los niños mostrarán sus talentos en música, danza y arte en un evento lleno de alegría y creatividad.', // Descripción breve
    image: childrenGroup, // Imagen del evento
  },
  {
    id: '2',
    title: 'Jornada de Salud Integral',
    date: '2025-12-20',
    time: '8:00 AM',
    location: 'Fundación Huahuacuna',
    description: 'Chequeos médicos, dentales y nutricionales gratuitos para todos los niños y sus familias.',
    image: childrenGroup,
  },
  {
    id: '3',
    title: 'Encuentro de Padrinos',
    date: '2025-10-29',
    time: '3:00 PM',
    location: 'Salón de Eventos',
    description: 'Espacio de encuentro entre padrinos y ahijados para fortalecer vínculos y compartir experiencias.',
    image: childrenGroup,
  },
];

// Componente principal que renderiza la página de eventos
const Events = () => {
  return (
    // Contenedor principal con un mínimo de altura de pantalla y márgenes verticales
    <div className="min-h-[calc(100vh-200px)] py-12">
      {/* Contenedor centrado y con márgenes laterales responsivos */}
      <div className="container mx-auto px-4">
        
        {/* Encabezado de la sección */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl mb-4">
            Próximos Eventos Huahuacuna
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Únete a nuestras actividades y sé parte de la transformación
          </p>
        </div>

        {/* Sección que lista todos los eventos */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Itera sobre cada evento del arreglo mockEvents */}
          {mockEvents.map((event) => (
            // Cada evento se renderiza dentro de una tarjeta (Card)
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Distribuye el contenido en dos columnas en pantallas medianas */}
              <div className="md:flex">
                
                {/* Sección izquierda: imagen del evento */}
                <div className="md:w-1/3 aspect-video md:aspect-square">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Sección derecha: información del evento */}
                <CardContent className="md:w-2/3 pt-6">
                  
                  {/* Encabezado del evento con título y badge */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading font-bold text-2xl">
                      {event.title}
                    </h3>
                    {/* Muestra una etiqueta (badge) indicando que es un evento próximo */}
                    <Badge variant="secondary">Próximo</Badge>
                  </div>

                  {/* Descripción del evento */}
                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>

                  {/* Información adicional: fecha, hora y ubicación */}
                  <div className="space-y-2 text-sm">
                    
                    {/* Fecha del evento con ícono de calendario */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      {new Date(event.date).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    {/* Hora del evento con ícono de reloj */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-accent" />
                      {event.time}
                    </div>

                    {/* Ubicación del evento con ícono de marcador */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-success" />
                      {event.location}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Exporta el componente para poder ser usado en el enrutador o en otras partes del proyecto
export default Events;
