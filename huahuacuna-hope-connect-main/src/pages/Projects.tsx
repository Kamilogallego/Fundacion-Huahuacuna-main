// Importaciones necesarias desde React y componentes UI personalizados
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, Heart, Sparkles } from 'lucide-react'; // Iconos
import childrenGroup from '@/assets/children-group.jpg'; // Imagen (no usada en este código pero importada)

// Array que simula una lista de proyectos (mock data)
const mockProjects = [
  {
    id: '1',
    title: 'Educación Integral',
    status: 'active', // Estado del proyecto: activo
    description: 'Programa de apoyo educativo que incluye clases de refuerzo, materiales escolares y seguimiento académico personalizado.',
    icon: BookOpen, // Icono representativo del proyecto
    color: 'text-primary', // Color temático del icono
  },
  {
    id: '2',
    title: 'Nutrición y Salud',
    status: 'active',
    description: 'Garantizamos alimentación balanceada y atención médica preventiva para todos los niños del programa.',
    icon: Heart,
    color: 'text-accent',
  },
  {
    id: '3',
    title: 'Desarrollo Artístico',
    status: 'active',
    description: 'Talleres de arte, música y teatro que fomentan la creatividad y expresión de los niños.',
    icon: Sparkles,
    color: 'text-secondary',
  },
  {
    id: '4',
    title: 'Campamento de Verano 2024',
    status: 'completed', // Estado finalizado
    description: 'Campamento recreativo y educativo donde los niños disfrutaron de actividades al aire libre y aprendizaje experiencial.',
    icon: Users,
    color: 'text-success',
  },
];

// Componente principal que muestra la sección de proyectos
const Projects = () => {
  // Estado para manejar el filtro actual ("all", "active", "completed")
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Filtra los proyectos según el filtro seleccionado
  const filteredProjects = filter === 'all' 
    ? mockProjects 
    : mockProjects.filter(p => p.status === filter);

  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      {/* Contenedor principal centrado */}
      <div className="container mx-auto px-4">

        {/* Encabezado de la página */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl mb-4">Nuestros Proyectos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Programas diseñados para el desarrollo integral de los niños
          </p>
        </div>

        {/* Sección de pestañas (Tabs) para filtrar proyectos */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-8">
          {/* Lista de pestañas */}
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="completed">Finalizados</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sección donde se renderizan las tarjetas de los proyectos */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            // Se asigna el ícono correspondiente a cada proyecto
            const Icon = project.icon;
            return (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    
                    {/* Ícono con fondo de color y tamaño definido */}
                    <div className={`p-3 rounded-lg bg-muted ${project.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>

                    {/* Contenido textual del proyecto */}
                    <div className="flex-1">
                      {/* Título y estado */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-heading font-bold text-xl">{project.title}</h3>
                        
                        {/* Insignia (Badge) que muestra si está activo o finalizado */}
                        <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                          {project.status === 'active' ? 'Activo' : 'Finalizado'}
                        </Badge>
                      </div>

                      {/* Descripción breve del proyecto */}
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Si no hay proyectos que coincidan con el filtro */}
        {filteredProjects.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              No hay proyectos en esta categoría
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

// Exporta el componente para su uso en otras partes del proyecto
export default Projects;
