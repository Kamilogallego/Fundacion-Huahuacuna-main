// Importación de componentes personalizados del proyecto
import { Button } from '@/components/ui/button'; // Botón reutilizable con estilos personalizados
import { Card, CardContent } from '@/components/ui/card'; // Componente de tarjeta y su contenido interno

// Importación de íconos desde la librería 'lucide-react'
import { Heart, Users, BookOpen, Award } from 'lucide-react';

// Hook de React Router para navegar entre rutas programáticamente
import { useNavigate } from 'react-router-dom';

// Importación de una imagen local usada en la sección principal (Hero)
import childrenGroup from '@/assets/children-group.jpg';

// Definición del componente principal 'Home'
const Home = () => {
  // Hook para realizar navegación programática entre páginas
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">{/* Contenedor principal con altura mínima igual a la pantalla completa */}

      {/* ========================= Hero Section ========================= */}
      <section className="relative h-[700px] flex items-center overflow-hidden">
        {/* Capa con degradado azul para superponer sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-950/60 to-transparent z-10" />

        {/* Imagen de fondo ocupando todo el ancho y alto del contenedor */}
        <img 
          src={childrenGroup}
          alt="Niños felices"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Contenedor del texto e información principal (encima del fondo) */}
        <div className="relative z-20 container mx-auto px-8 max-w-7xl">
          <div className="max-w-3xl">
            {/* Título principal con colores y estilos diferenciados */}
            <h1 className="font-bold text-5xl md:text-7xl leading-tight mb-6">
              <span className="text-white">Sembrando Futuro en la </span>
              <span className="text-yellow-500">Niñez Vulnerable</span>
            </h1>

            {/* Cita bíblica o lema */}
            <p className="text-xl text-white italic mb-6 font-light">
              "Cualquiera que reciba en mi nombre a un niño como éste, a mí me recibe..." 
            </p>

            {/* Texto descriptivo de la organización */}
            <p className="text-lg text-white/95 mb-10 leading-relaxed">
              Desde 2003, brindamos amor de madre a cada niño vulnerable en Armenia, Quindío. 
              Más de 21 años transformando vidas a través de la educación, salud y esperanza.
            </p>

            {/* Botones de acción principales */}
            <div className="flex flex-wrap gap-4">
              {/* Botón que redirige a la página de apadrinamiento */}
              <Button
                size="lg"
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-8 py-6 text-lg rounded-lg"
                onClick={() => navigate('/apadrina')}
              >
                Apadrina un Niño →
              </Button>

              {/* Botón que redirige a la página de donaciones */}
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-2 border-white/60 hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg rounded-lg"
                onClick={() => navigate('/donaciones')}
              >
                Donaciones
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= Stats Section ========================= */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Cuadrícula de cuatro tarjetas con estadísticas */}
          <div className="grid md:grid-cols-4 gap-8">

            {/* Tarjeta 1: Niños Apadrinados */}
            <Card className="text-center shadow-md">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <h3 className="font-bold text-3xl mb-2">150+</h3>
                <p className="text-gray-600">Niños Apadrinados</p>
              </CardContent>
            </Card>

            {/* Tarjeta 2: Padrinos Activos */}
            <Card className="text-center shadow-md">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-3xl mb-2">200+</h3>
                <p className="text-gray-600">Padrinos Activos</p>
              </CardContent>
            </Card>

            {/* Tarjeta 3: Proyectos Activos */}
            <Card className="text-center shadow-md">
              <CardContent className="pt-6">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-3xl mb-2">12</h3>
                <p className="text-gray-600">Proyectos Activos</p>
              </CardContent>
            </Card>

            {/* Tarjeta 4: Años de Impacto */}
            <Card className="text-center shadow-md">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-bold text-3xl mb-2">8</h3>
                <p className="text-gray-600">Años de Impacto</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================= Mission Section ========================= */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Título de la sección */}
            <h2 className="font-bold text-4xl mb-6 text-gray-900">Nuestra Misión</h2>

            {/* Descripción de la misión institucional */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              La Fundación Huahuacuna trabaja incansablemente para brindar oportunidades de educación, 
              nutrición y desarrollo integral a niños en situación de vulnerabilidad. Creemos que cada 
              niño merece crecer en un ambiente seguro, con acceso a educación de calidad y con la 
              esperanza de un futuro mejor.
            </p>

            {/* Botón para unirse al voluntariado */}
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50"
              onClick={() => navigate('/voluntariado')}
            >
              Únete como Voluntario
            </Button>
          </div>
        </div>
      </section>

      {/* ========================= CTA (Call To Action) Section ========================= */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          {/* Título de la llamada a la acción */}
          <h2 className="font-bold text-4xl mb-6">¿Listo para Hacer la Diferencia?</h2>

          {/* Mensaje motivacional */}
          <p className="text-lg mb-8 opacity-90">
            Tu apoyo puede cambiar el destino de un niño. Comienza hoy.
          </p>

          {/* Botón que redirige al formulario para convertirse en padrino */}
          <Button
            size="lg"
            className="bg-white text-green-700 hover:bg-gray-100 font-semibold gap-2"
            onClick={() => navigate('/registro-apadrinador')}
          >
            <Heart className="h-5 w-5" />
            Aplica para Ser Padrino
          </Button>
        </div>
      </section>
    </div>
  );
};

// Exportación del componente para su uso en el sistema de rutas u otras partes de la aplicación
export default Home;
