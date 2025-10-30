// Importación de hooks y componentes necesarios desde React, React Router y librerías de UI
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card'; // Componente de tarjeta
import { Button } from '@/components/ui/button'; // Botón reutilizable
import { Badge } from '@/components/ui/badge'; // Etiquetas visuales (badges)
import { mockChildren } from '@/data/mockChildren'; // Datos simulados de niños (base de datos temporal)
import { useNavigate } from 'react-router-dom'; // Hook para navegar entre rutas
import { Heart, Grid3x3, List } from 'lucide-react'; // Iconos SVG
import { useAuth } from '@/contexts/AuthContext'; // Contexto de autenticación (para saber el rol del usuario)

// Componente principal del catálogo de niños disponibles para apadrinar
const Catalog = () => {
  // Estado para alternar entre vista de cuadrícula o lista
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Hook para redirigir entre rutas
  const navigate = useNavigate();

  // Acceso al usuario autenticado mediante el contexto
  const { user } = useAuth();

  // Filtrado de niños según el rol del usuario:
  // Si el usuario es "admin", se muestran todos los niños;
  // Si no lo es, se muestran solo los que no están apadrinados.
  const displayChildren = user?.role === 'admin' 
    ? mockChildren 
    : mockChildren.filter(child => !child.sponsored);

  // Renderizado principal del componente
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4">
        
        {/* Título e introducción del catálogo */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl mb-4">Elige a Quién Quieres Ayudar</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada niño tiene una historia única y un futuro lleno de esperanza. Tu apadrinamiento puede marcar la diferencia.
          </p>
        </div>

        {/* Contenedor superior: cantidad de niños disponibles + botones para cambiar la vista */}
        <div className="flex justify-between items-center mb-8">
          {/* Badge que muestra la cantidad de niños disponibles */}
          <Badge variant="secondary" className="text-base">
            {displayChildren.length} {displayChildren.length === 1 ? 'niño disponible' : 'niños disponibles'}
          </Badge>

          {/* Botones para alternar entre vista en cuadrícula y lista */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Si no hay niños disponibles, muestra un mensaje */}
        {displayChildren.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-heading font-bold text-2xl mb-2">
              No hay niños disponibles en este momento
            </h3>
            <p className="text-muted-foreground">
              Todos nuestros niños cuentan con apadrinamiento. Pronto habrá nuevas oportunidades.
            </p>
          </Card>
        ) : (
          // Si hay niños disponibles, renderiza las tarjetas según la vista seleccionada
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {displayChildren.map((child) => (
              <Card key={child.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                
                {/* Imagen del niño con etiqueta "Apadrinado" si aplica */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={child.image}
                    alt={child.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {child.sponsored && (
                    <Badge className="absolute top-4 right-4 bg-muted text-muted-foreground">
                      Apadrinado
                    </Badge>
                  )}
                </div>

                {/* Información del niño */}
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-heading font-bold text-2xl">{child.name}</h3>
                    <Badge variant="secondary">{child.age} años</Badge>
                  </div>
                  <p className="text-muted-foreground line-clamp-3">
                    {child.description}
                  </p>
                </CardContent>

                {/* Botón inferior: ver detalles o apadrinar */}
                <CardFooter>
                  <Button
                    onClick={() => navigate(`/apadrina/${child.id}`)}
                    className="w-full gap-2"
                    variant={child.sponsored ? 'outline' : 'default'}
                  >
                    {child.sponsored ? 'Ver Detalles' : (
                      <>
                        <Heart className="h-4 w-4" />
                        Ver Más
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Exportación del componente para su uso en otras partes del proyecto
export default Catalog;
