// Importamos los íconos que se usarán en el pie de página desde la librería lucide-react
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

// Importamos el componente Link de React Router para crear enlaces de navegación interna
import { Link } from 'react-router-dom';

// Definición del componente funcional Footer
export const Footer = () => {
  return (
    // Etiqueta <footer> con estilos de fondo y texto. "mt-auto" hace que se mantenga al final de la página.
    <footer className="bg-primary text-primary-foreground mt-auto">
      {/* Contenedor principal con márgenes laterales y padding vertical */}
      <div className="container mx-auto px-4 py-12">
        {/* Estructura de cuadrícula: en pantallas medianas (md) divide en 4 columnas */}
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* --- COLUMNA 1: Información general de la fundación --- */}
          <div>
            {/* Nombre o título principal del pie de página */}
            <h3 className="font-heading font-bold text-lg mb-4">Fundación Huahuacuna</h3>
            {/* Lema o descripción corta */}
            <p className="text-sm opacity-90">
              Sembrando Futuro en la Niñez Vulnerable
            </p>
            {/* Línea adicional con ícono de corazón y frase motivacional */}
            <div className="flex items-center gap-2 mt-4">
              <Heart className="h-5 w-5 text-accent" />
              <span className="text-sm">Transformando vidas con amor</span>
            </div>
          </div>

          {/* --- COLUMNA 2: Navegación principal --- */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Navegación</h4>
            {/* Lista de enlaces de navegación */}
            <ul className="space-y-2 text-sm">
              <li><Link to="/apadrina" className="hover:text-secondary transition-colors">Apadrina un niño</Link></li>
              <li><Link to="/donaciones" className="hover:text-secondary transition-colors">Donaciones</Link></li>
              <li><Link to="/voluntariado" className="hover:text-secondary transition-colors">Voluntariado</Link></li>
              <li><Link to="/proyectos" className="hover:text-secondary transition-colors">Proyectos</Link></li>
            </ul>
          </div>

          {/* --- COLUMNA 3: Enlaces adicionales o informativos --- */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Información</h4>
            {/* Lista de enlaces secundarios */}
            <ul className="space-y-2 text-sm">
              <li><Link to="/bitacora" className="hover:text-secondary transition-colors">Bitácora</Link></li>
              <li><Link to="/eventos" className="hover:text-secondary transition-colors">Eventos</Link></li>
              <li><Link to="/login" className="hover:text-secondary transition-colors">Iniciar Sesión</Link></li>
            </ul>
          </div>

          {/* --- COLUMNA 4: Información de contacto --- */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contacto</h4>
            {/* Lista con datos de contacto y sus respectivos íconos */}
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contacto@huahuacuna.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+57 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Armenia, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- SECCIÓN INFERIOR DEL FOOTER: Derechos reservados --- */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-75">
          {/* Inserta automáticamente el año actual con JavaScript */}
          <p>&copy; {new Date().getFullYear()} Fundación Huahuacuna. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
