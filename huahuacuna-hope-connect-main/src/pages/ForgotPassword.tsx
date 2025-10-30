// Importa el hook useState de React para manejar el estado del componente
import { useState } from 'react';

// Importa componentes reutilizables de la UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Importa el componente Link para navegar entre rutas sin recargar la página
import { Link } from 'react-router-dom';

// Importa el sistema de notificaciones "sonner" para mostrar mensajes emergentes
import { toast } from 'sonner';

// Importa el ícono de flecha para usar en los botones
import { ArrowLeft } from 'lucide-react';

// Importa el logo de la fundación
import logo from '@/assets/logo-huahuacuna.png';

// Componente principal: Página de "Recuperar Contraseña"
const ForgotPassword = () => {
  // Estado que guarda el correo ingresado por el usuario
  const [email, setEmail] = useState('');

  // Estado que indica si el formulario ya fue enviado correctamente
  const [submitted, setSubmitted] = useState(false);

  // Estado que controla si la solicitud está en proceso (para mostrar "Enviando...")
  const [loading, setLoading] = useState(false);

  // Función que maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    setLoading(true); // Activa el modo de carga

    // Simula una llamada a una API con una espera de 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Cambia los estados tras la simulación de la solicitud
    setSubmitted(true);
    setLoading(false);

    // Muestra una notificación de éxito usando "sonner"
    toast.success('Si tu correo está registrado, recibirás instrucciones para recuperar tu contraseña.');
  };

  // Si el formulario ya fue enviado correctamente, se muestra esta vista de confirmación
  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-muted">
        {/* Tarjeta de confirmación */}
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            {/* Logo de la fundación */}
            <div className="flex justify-center">
              <img src={logo} alt="Fundación Huahuacuna" className="h-20 w-auto" />
            </div>

            {/* Título y descripción */}
            <CardTitle className="font-heading text-2xl">Revisa tu Correo</CardTitle>
            <CardDescription>
              Si tu correo está registrado, recibirás instrucciones para restablecer tu contraseña.
            </CardDescription>
          </CardHeader>

          {/* Botón para regresar al login */}
          <CardContent>
            <Link to="/login">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio de sesión
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Si el formulario no ha sido enviado, se muestra el formulario principal
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-muted">
      {/* Contenedor de la tarjeta del formulario */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          {/* Logo de la fundación */}
          <div className="flex justify-center">
            <img src={logo} alt="Fundación Huahuacuna" className="h-20 w-auto" />
          </div>

          {/* Título y texto descriptivo */}
          <CardTitle className="font-heading text-2xl">Recuperar Contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
          </CardDescription>
        </CardHeader>

        {/* Contenido principal: el formulario */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de entrada del correo */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email} // Enlaza el valor con el estado "email"
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando el usuario escribe
                required // Campo obligatorio
              />
            </div>

            {/* Botón de envío del formulario */}
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90"
              disabled={loading} // Desactiva el botón mientras se envía
            >
              {/* Cambia el texto según el estado de carga */}
              {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
            </Button>

            {/* Botón para volver al inicio de sesión */}
            <Link to="/login">
              <Button variant="ghost" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio de sesión
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Exporta el componente para poder usarlo en las rutas de la aplicación
export default ForgotPassword;
