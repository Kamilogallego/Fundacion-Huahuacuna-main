// Importa hooks y componentes necesarios desde React y librerías UI
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner'; // Librería para mostrar mensajes emergentes (notificaciones)
import { Users, Heart } from 'lucide-react'; // Íconos
import volunteeringHero from '@/assets/volunteering-hero.jpg'; // Imagen de fondo para el encabezado

// Componente principal de la página de voluntariado
const Volunteering = () => {
  // useState define el estado del formulario con sus campos iniciales vacíos
  const [formData, setFormData] = useState({
    name: '',      // Nombre del voluntario
    email: '',     // Correo electrónico
    phone: '',     // Número de teléfono
    type: '',      // Tipo de voluntariado
    comment: '',   // Comentario opcional
  });

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Simula un pequeño retraso de red (como si enviara los datos a un servidor)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Muestra mensajes de confirmación usando 'toast'
    toast.success('¡Solicitud enviada!');
    toast.info('Nos pondremos en contacto contigo pronto.');

    // Limpia el formulario después de enviarlo
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: '',
      comment: '',
    });
  };

  // JSX que renderiza el contenido de la página
  return (
    <div className="min-h-[calc(100vh-200px)]">
      {/* ================= SECCIÓN HERO ================= */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Capa de color con degradado sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-success/90 to-primary/80 z-10" />
        
        {/* Imagen de fondo */}
        <img 
          src={volunteeringHero}
          alt="Voluntariado"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Contenido principal centrado */}
        <div className="relative z-20 text-center px-4 max-w-3xl">
          <Users className="h-16 w-16 mx-auto mb-6 text-success-foreground" /> {/* Ícono */}
          <h1 className="font-heading font-bold text-5xl text-success-foreground mb-4">
            Únete Como Voluntario
          </h1>
          <p className="text-xl text-success-foreground/90">
            Comparte tu tiempo, tus talentos y tu corazón
          </p>
        </div>
      </section>

      {/* ================= SECCIÓN DE CONTENIDO ================= */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            
            {/* Columna izquierda: información sobre el voluntariado */}
            <div>
              <h2 className="font-heading font-bold text-3xl mb-6">
                ¿Por Qué Ser Voluntario?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Como voluntario en Fundación Huahuacuna, tendrás la oportunidad única de impactar 
                  directamente en la vida de niños que necesitan apoyo y orientación.
                </p>
                <p>
                  Ya sea que tengas habilidades en educación, arte, deportes o simplemente un corazón 
                  dispuesto a ayudar, hay un espacio para ti en nuestra fundación.
                </p>

                {/* Lista de áreas de apoyo */}
                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Áreas donde puedes ayudar:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Docencia y apoyo académico</li>
                    <li>Talleres de arte y creatividad</li>
                    <li>Actividades deportivas y recreativas</li>
                    <li>Apoyo logístico y administrativo</li>
                    <li>Organización de eventos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Columna derecha: formulario */}
            <Card>
              <CardContent className="pt-8">
                <h3 className="font-heading font-bold text-2xl mb-6">
                  Solicitud de Voluntariado
                </h3>

                {/* Formulario controlado */}
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Campo: Nombre */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  {/* Campo: Correo */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  {/* Campo: Teléfono */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  {/* Campo: Tipo de voluntariado (menú desplegable) */}
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Voluntariado *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="docencia">Docencia</SelectItem>
                        <SelectItem value="arte">Arte y Creatividad</SelectItem>
                        <SelectItem value="deportes">Deportes y Recreación</SelectItem>
                        <SelectItem value="logistica">Apoyo Logístico</SelectItem>
                        <SelectItem value="eventos">Organización de Eventos</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Campo: Comentario */}
                  <div className="space-y-2">
                    <Label htmlFor="comment">Comentario (Opcional)</Label>
                    <Textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                      placeholder="Cuéntanos sobre tu experiencia o intereses..."
                    />
                  </div>

                  {/* Botón de envío */}
                  <Button
                    type="submit"
                    className="w-full gap-2 bg-success hover:bg-success/90"
                  >
                    <Heart className="h-4 w-4" /> {/* Ícono de corazón */}
                    Enviar Solicitud
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

// Exporta el componente para que pueda usarse en otras partes de la aplicación
export default Volunteering;
