// Importa los componentes de la interfaz de usuario reutilizables desde la carpeta local `components/ui`
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Importa un conjunto de datos simulados (niños que pueden ser apadrinados)
import { mockChildren } from '@/data/mockChildren';

// Importa el hook `useNavigate` de React Router, que permite la navegación programática entre rutas
import { useNavigate } from 'react-router-dom';

// Importa el ícono de corazón desde la librería de íconos `lucide-react`
import { Heart } from 'lucide-react';

// Componente principal: Catálogo de niños disponibles para apadrinar
const SponsorCatalog = () => {
  // Inicializa el hook `useNavigate` para poder redirigir al usuario a otras páginas
  const navigate = useNavigate();

  // Filtra los niños disponibles, excluyendo los que ya están apadrinados
  const availableChildren = mockChildren.filter(child => !child.sponsored);

  return (
    <div>
      {/* Encabezado de la página */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">Niños</h1>
        <p className="text-muted-foreground">
          Conoce a los niños que puedes apadrinar
        </p>
      </div>

      {/* Si no hay niños disponibles, muestra un mensaje informativo */}
      {availableChildren.length === 0 ? (
        <Card className="p-12 text-center">
          {/* Ícono decorativo */}
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          
          {/* Mensaje principal */}
          <h3 className="font-heading font-bold text-2xl mb-2">
            No hay niños disponibles en este momento
          </h3>

          {/* Subtexto aclaratorio */}
          <p className="text-muted-foreground">
            Todos nuestros niños cuentan con apadrinamiento. Pronto habrá nuevas oportunidades.
          </p>
        </Card>
      ) : (
        // Si hay niños disponibles, muestra un catálogo en forma de cuadrícula
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableChildren.map((child) => (
            // Cada niño se muestra dentro de una tarjeta (Card)
            <Card 
              key={child.id} // clave única requerida por React
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Sección de la imagen del niño */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={child.image} // ruta de la imagen
                  alt={child.name} // texto alternativo (accesibilidad)
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Contenido textual dentro de la tarjeta */}
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">
                  {/* Nombre del niño */}
                  <h3 className="font-heading font-bold text-2xl">{child.name}</h3>
                  {/* Etiqueta con la edad del niño */}
                  <Badge variant="secondary">{child.age} años</Badge>
                </div>

                {/* Breve descripción del niño */}
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {child.description}
                </p>

                {/* Botón que redirige a la página del niño seleccionado */}
                <Button
                  onClick={() => navigate(`/apadrina/${child.id}`)} // redirección al detalle del niño
                  className="w-full gap-2"
                >
                  <Heart className="h-4 w-4" /> {/* Ícono de corazón */}
                  Ver Más {/* Texto del botón */}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Exporta el componente para ser usado en otras partes del proyecto
export default SponsorCatalog;
