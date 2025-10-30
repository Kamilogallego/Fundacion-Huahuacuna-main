// Importación de librerías, hooks y componentes necesarios
import { useState } from 'react'; // Hook para manejar estados locales
import { useParams, useNavigate } from 'react-router-dom'; // Hooks para obtener parámetros de URL y navegar entre rutas
import { Button } from '@/components/ui/button'; // Botón reutilizable de la interfaz
import { Card, CardContent } from '@/components/ui/card'; // Contenedores tipo tarjeta
import { Badge } from '@/components/ui/badge'; // Etiquetas visuales
import { Label } from '@/components/ui/label'; // Etiquetas para formularios
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Grupo de botones de opción
import { mockChildren } from '@/data/mockChildren'; // Datos simulados de niños (mock data)
import { useAuth } from '@/contexts/AuthContext'; // Contexto de autenticación para obtener usuario actual
import { toast } from 'sonner'; // Librería para notificaciones emergentes
import { Heart, ArrowLeft, DollarSign } from 'lucide-react'; // Íconos SVG
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'; // Componente modal para confirmación

// Componente principal: Detalle del niño seleccionado
const ChildDetail = () => {
  // Hook para obtener el ID del niño desde la URL
  const { id } = useParams();
  // Hook para redirigir entre páginas
  const navigate = useNavigate();
  // Obtiene la información del usuario autenticado desde el contexto
  const { user } = useAuth();

  // Estado para el monto seleccionado en la apadrinación
  const [selectedAmount, setSelectedAmount] = useState('50000');
  // Estado que controla la visualización del cuadro de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Busca el niño en los datos simulados según el ID recibido en la URL
  const child = mockChildren.find(c => c.id === id);

  // Si no se encuentra el niño, muestra un mensaje de error y opción para regresar
  if (!child) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <Card className="p-12 text-center">
          <p>Niño no encontrado</p>
          <Button onClick={() => navigate('/apadrina')} className="mt-4">
            Volver al catálogo
          </Button>
        </Card>
      </div>
    );
  }

  // Función que maneja el intento de apadrinamiento
  const handleSponsor = () => {
    // Verifica si el usuario no ha iniciado sesión
    if (!user) {
      toast.error('Debes iniciar sesión para apadrinar');
      navigate('/login');
      return;
    }

    // Solo usuarios con rol "sponsor" o "admin" pueden apadrinar
    if (user.role !== 'sponsor' && user.role !== 'admin') {
      toast.error('Solo los padrinos aprobados pueden apadrinar niños');
      return;
    }

    // Verifica si el niño ya tiene padrino asignado
    if (child.sponsored) {
      toast.error('Este niño ya cuenta con un padrino');
      return;
    }

    // Si todo está bien, muestra el cuadro de confirmación
    setShowConfirmation(true);
  };

  // Función que confirma la acción de apadrinar
  const confirmSponsorship = () => {
    // Aquí en un entorno real se llamaría a la API para registrar el apadrinamiento
    toast.success('¡Gracias por sembrar esperanza!');
    toast.info('Recibirás información detallada en tu correo electrónico.');
    setShowConfirmation(false);
    // Redirige al catálogo del padrinador después de 2 segundos
    setTimeout(() => navigate('/apadrinador/catalogo'), 2000);
  };

  // Renderizado principal del componente
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Botón para volver al catálogo de niños */}
        <Button
          variant="ghost"
          onClick={() => navigate('/apadrina')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Button>

        {/* Distribución en dos columnas: imagen e información */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagen del niño */}
          <div className="relative">
            <img
              src={child.image}
              alt={child.name}
              className="w-full aspect-square object-cover rounded-lg shadow-lg"
            />
            {/* Si el niño ya está apadrinado, muestra una etiqueta */}
            {child.sponsored && (
              <Badge className="absolute top-4 right-4 bg-muted text-muted-foreground text-lg py-2 px-4">
                Apadrinado
              </Badge>
            )}
          </div>

          {/* Información textual y acciones */}
          <div className="space-y-6">
            {/* Encabezado con nombre y edad */}
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="font-heading font-bold text-4xl">{child.name}</h1>
                <Badge variant="secondary" className="text-lg py-1 px-3">
                  {child.age} años
                </Badge>
              </div>

              {/* Si ya está apadrinado, muestra nombre del padrino y fecha */}
              {child.sponsored && child.sponsorName && (
                <p className="text-muted-foreground">
                  Apadrinado por {child.sponsorName} desde {child.sponsorshipDate}
                </p>
              )}
            </div>

            {/* Tarjeta con la historia del niño */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <h3 className="font-heading font-semibold text-xl mb-3">Su Historia</h3>
                <p className="leading-relaxed">{child.description}</p>
              </CardContent>
            </Card>

            {/* Si el niño aún no está apadrinado, muestra opciones de apadrinamiento */}
            {!child.sponsored && (
              <>
                {/* Sección para seleccionar monto mensual */}
                <Card>
                  <CardContent className="pt-6">
                    <Label className="font-heading font-semibold text-lg mb-4 block">
                      Selecciona el monto de apadrinamiento mensual
                    </Label>
                    <RadioGroup value={selectedAmount} onValueChange={setSelectedAmount}>
                      {/* Opción 1: $30.000 COP */}
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted transition-colors">
                        <RadioGroupItem value="30000" id="30k" />
                        <Label htmlFor="30k" className="flex-1 cursor-pointer">
                          <span className="font-semibold">$30.000 COP</span>
                          <span className="text-sm text-muted-foreground block">
                            Apoyo básico
                          </span>
                        </Label>
                      </div>
                      {/* Opción 2: $50.000 COP */}
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted transition-colors">
                        <RadioGroupItem value="50000" id="50k" />
                        <Label htmlFor="50k" className="flex-1 cursor-pointer">
                          <span className="font-semibold">$50.000 COP</span>
                          <span className="text-sm text-muted-foreground block">
                            Apoyo estándar (recomendado)
                          </span>
                        </Label>
                      </div>
                      {/* Opción 3: $100.000 COP */}
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted transition-colors">
                        <RadioGroupItem value="100000" id="100k" />
                        <Label htmlFor="100k" className="flex-1 cursor-pointer">
                          <span className="font-semibold">$100.000 COP</span>
                          <span className="text-sm text-muted-foreground block">
                            Apoyo completo
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Botón para confirmar apadrinamiento */}
                <Button
                  size="lg"
                  onClick={handleSponsor}
                  className="w-full gap-2 bg-accent hover:bg-accent/90"
                >
                  <Heart className="h-5 w-5" />
                  Apadrinar a {child.name}
                </Button>
              </>
            )}

            {/* Botón para redirigir a la sección de donaciones */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/donaciones')}
              className="w-full gap-2"
            >
              <DollarSign className="h-5 w-5" />
              Hacer una Donación
            </Button>
          </div>
        </div>
      </div>

      {/* ======= Modal de Confirmación ======= */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              ¡Gracias por tu Compromiso!
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              {/* Mensaje con resumen del aporte */}
              <p>
                Estás a punto de apadrinar a <strong>{child.name}</strong> con un aporte mensual de{' '}
                <strong>${parseInt(selectedAmount).toLocaleString()} COP</strong>.
              </p>
              <p>
                Tu apoyo transformará su vida brindándole acceso a educación, nutrición y desarrollo integral.
              </p>
              {/* Botones dentro del modal */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={confirmSponsorship}
                  className="flex-1 gap-2 bg-success hover:bg-success/90"
                >
                  <Heart className="h-4 w-4" />
                  Confirmar
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Exporta el componente para su uso en otras partes del proyecto
export default ChildDetail;
