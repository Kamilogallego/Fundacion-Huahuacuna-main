// Importación de componentes reutilizables desde la carpeta de UI
import { Card, CardContent } from '@/components/ui/card'; // Componente de tarjeta (estructura visual)
import { Badge } from '@/components/ui/badge'; // Componente para mostrar etiquetas o categorías
import { Button } from '@/components/ui/button'; // Botón reutilizable estilizado
import { useNavigate } from 'react-router-dom'; // Hook para redireccionar entre rutas
import { Calendar, ArrowRight } from 'lucide-react'; // Iconos SVG para mejorar la interfaz
import childrenGroup from '@/assets/children-group.jpg'; // Imagen de grupo de niños
import volunteeringHero from '@/assets/volunteering-hero.jpg'; // Imagen representativa del voluntariado

// Datos simulados de publicaciones del blog (mockPosts)
// En una app real, estos datos vendrían desde una base de datos o API
const mockPosts = [
  {
    id: '1',
    title: 'Celebración de Fin de Año Escolar', // Título del artículo
    date: '2024-12-15', // Fecha del evento
    image: childrenGroup, // Imagen del post
    summary:
      'Los niños de la fundación celebraron con alegría el cierre de un año lleno de aprendizajes y logros. Fue un día memorable para todos.',
  },
  {
    id: '2',
    title: 'Taller de Arte y Creatividad',
    date: '2024-11-20',
    image: volunteeringHero,
    summary:
      'Nuestros voluntarios realizaron un taller de arte donde los niños exploraron su creatividad a través de la pintura y el dibujo.',
  },
  {
    id: '3',
    title: 'Campaña de Donación de Útiles',
    date: '2024-10-10',
    image: childrenGroup,
    summary:
      'Gracias a la generosidad de nuestros padrinos, pudimos entregar útiles escolares a más de 100 niños para el nuevo año escolar.',
  },
];

// Componente principal del blog
const Blog = () => {
  // Hook de navegación para redirigir al detalle de cada publicación
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4">
        
        {/* Encabezado del blog */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl mb-4">Historias que Inspiran</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre las actividades, logros y momentos especiales de la Fundación Huahuacuna
          </p>
        </div>

        {/* Sección que muestra las tarjetas de publicaciones */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Se mapean las publicaciones simuladas para generar una tarjeta por cada una */}
          {mockPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              
              {/* Imagen destacada del post */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Contenido de la tarjeta */}
              <CardContent className="pt-6 space-y-4">
                
                {/* Fecha de publicación formateada (ej: "15 de diciembre de 2024") */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                {/* Título y resumen del post */}
                <h3 className="font-heading font-bold text-xl">{post.title}</h3>
                <p className="text-muted-foreground">{post.summary}</p>

                {/* Botón para ver más detalles del artículo */}
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/bitacora/${post.id}`)} // Redirige a la ruta dinámica del post
                  className="gap-2 p-0 h-auto"
                >
                  Leer más
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Exporta el componente Blog para ser usado en otras rutas o secciones del proyecto
export default Blog;
