// Importa los hooks y componentes necesarios
import { useState } from 'react'; // Hook para manejar estados locales
import { Button } from '@/components/ui/button'; // Botón estilizado reutilizable
import { Input } from '@/components/ui/input'; // Campo de entrada personalizado
import { Label } from '@/components/ui/label'; // Etiquetas para los campos
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Tarjeta contenedora del formulario
import { useAuth } from '@/contexts/AuthContext'; // Contexto de autenticación (para manejar login)
import { Link } from 'react-router-dom'; // Para enlaces internos sin recargar la página
import { toast } from 'sonner'; // Librería para mostrar notificaciones emergentes
import { Heart } from 'lucide-react'; // Icono decorativo
import logo from '@/assets/logo-huahuacuna.png'; // Logo de la fundación

// Componente principal del formulario de inicio de sesión
const Login = () => {
  // Estados locales para manejar los valores de entrada
  const [email, setEmail] = useState(''); // Correo electrónico del usuario
  const [password, setPassword] = useState(''); // Contraseña del usuario
  const [loading, setLoading] = useState(false); // Estado de carga para evitar múltiples envíos

  // Obtiene la función `login` del contexto de autenticación
  const { login } = useAuth();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene la recarga de la página por defecto
    setLoading(true); // Activa el estado de carga mientras se procesa el login

    try {
      // Intenta autenticar al usuario con las credenciales ingresadas
      await login(email, password);
      toast.success('¡Bienvenido!'); // Muestra mensaje de éxito
    } catch (error) {
      // Si ocurre un error (por ejemplo, credenciales inválidas)
      toast.error('Credenciales inválidas. Por favor verifica tus datos.');
    } finally {
      // Desactiva el estado de carga sin importar el resultado
      setLoading(false);
    }
  };

  // Estructura visual del componente
  return (
    // Contenedor que ocupa toda la altura de la pantalla y centra el contenido
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-muted">
      {/* Tarjeta que contiene todo el formulario */}
      <Card className="w-full max-w-md">
        {/* Encabezado de la tarjeta */}
        <CardHeader className="text-center space-y-4">
          {/* Logo de la fundación */}
          <div className="flex justify-center">
            <img src={logo} alt="Fundación Huahuacuna" className="h-20 w-auto" />
          </div>

          {/* Título principal */}
          <CardTitle className="font-heading text-2xl">Iniciar Sesión</CardTitle>

          {/* Descripción breve debajo del título */}
          <CardDescription>
            Accede a tu cuenta para continuar
          </CardDescription>
        </CardHeader>

        {/* Contenido del formulario */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Campo de correo electrónico */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email} // Valor controlado por el estado
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando el usuario escribe
                required
              />
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Botón de inicio de sesión */}
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90"
              disabled={loading} // Desactiva el botón mientras se carga
            >
              {/* Muestra texto diferente si está cargando */}
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>

            {/* Enlaces secundarios */}
            <div className="text-center space-y-2">
              {/* Enlace para recuperar contraseña */}
              <Link
                to="/recuperar-contrasena"
                className="text-sm text-primary hover:underline block"
              >
                ¿Olvidaste tu contraseña?
              </Link>

              {/* Enlace para registrarse como padrino */}
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link
                  to="/registro-apadrinador"
                  className="text-accent hover:underline inline-flex items-center gap-1"
                >
                  <Heart className="h-3 w-3" />
                  Aplica aquí
                </Link>
              </p>
            </div>

            {/* Información de prueba para acceder con cuentas demo */}
            <div className="pt-4 border-t text-xs text-muted-foreground text-center">
              <p className="mb-2">Para probar la aplicación:</p>
              <p><strong>Admin:</strong> admin@huahuacuna.org / admin123</p>
              <p><strong>Padrino:</strong> cualquier@email.com / password</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Exporta el componente para usarlo en otras partes de la aplicación
export default Login;
