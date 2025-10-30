// Importación de hooks y componentes necesarios
import { useState } from 'react'; // Hook para manejar estados locales
import { Button } from '@/components/ui/button'; // Componente de botón personalizado
import { Input } from '@/components/ui/input'; // Campo de entrada de texto
import { Label } from '@/components/ui/label'; // Etiquetas de texto
import { Checkbox } from '@/components/ui/checkbox'; // Checkbox para opciones booleanas
import { Card, CardContent } from '@/components/ui/card'; // Contenedor tipo tarjeta para secciones visuales
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Grupo de botones de opción
import { toast } from 'sonner'; // Librería para mostrar notificaciones tipo "toast"
import { Heart, DollarSign } from 'lucide-react'; // Íconos decorativos
import donationHero from '@/assets/donation-hero.jpg'; // Imagen para el encabezado de la sección

// Componente principal Donations
const Donations = () => {
  // Estado para manejar la información del formulario
  const [formData, setFormData] = useState({
    name: '',           // Nombre del donante
    email: '',          // Correo electrónico del donante
    amount: '50000',    // Monto seleccionado (por defecto 50.000)
    customAmount: '',   // Monto personalizado (si elige "Otro monto")
    anonymous: false,   // Si desea donar de forma anónima
  });

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita la recarga de la página
    
    // Simulación de llamada a API (espera 0.8 segundos)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mensajes de confirmación
    toast.success('¡Gracias por tu generosidad!');
    toast.info('Tu donación ayudará a transformar vidas. Recibirás confirmación por correo.');
    
    // Reinicio del formulario
    setFormData({
      name: '',
      email: '',
      amount: '50000',
      customAmount: '',
      anonymous: false,
    });
  };

  // Determina el monto final dependiendo de si el usuario eligió un monto fijo o personalizado
  const finalAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount;

  return (
    <div className="min-h-[calc(100vh-200px)]">
      {/* ======= Sección Hero (Encabezado visual) ======= */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Capa de color semitransparente sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-accent/70 z-10" />
        {/* Imagen de fondo */}
        <img 
          src={donationHero}
          alt="Donaciones"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Texto central sobre la imagen */}
        <div className="relative z-20 text-center px-4 max-w-3xl">
          <Heart className="h-16 w-16 mx-auto mb-6 text-accent-foreground" />
          <h1 className="font-heading font-bold text-5xl text-accent-foreground mb-4">
            Transforma Vidas con tu Donación
          </h1>
          <p className="text-xl text-accent-foreground/90">
            Cada aporte cuenta para construir un futuro mejor
          </p>
        </div>
      </section>

      {/* ======= Sección del Formulario de Donación ======= */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardContent className="pt-8">
              {/* Formulario principal */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Campo Nombre */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Campo Correo */}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Selección de monto */}
                <div className="space-y-3">
                  <Label>Monto de Donación *</Label>

                  {/* Grupo de opciones de montos */}
                  <RadioGroup 
                    value={formData.amount} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}>
                    
                    {/* Montos predefinidos */}
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                        <RadioGroupItem value="30000" id="d30k" />
                        <Label htmlFor="d30k" className="flex-1 cursor-pointer font-semibold">
                          $30.000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                        <RadioGroupItem value="50000" id="d50k" />
                        <Label htmlFor="d50k" className="flex-1 cursor-pointer font-semibold">
                          $50.000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                        <RadioGroupItem value="100000" id="d100k" />
                        <Label htmlFor="d100k" className="flex-1 cursor-pointer font-semibold">
                          $100.000
                        </Label>
                      </div>
                    </div>

                    {/* Opción de monto personalizado */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="cursor-pointer">
                        Otro monto
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Campo para monto personalizado (solo si elige "Otro monto") */}
                  {formData.amount === 'custom' && (
                    <Input
                      type="number"
                      placeholder="Ingresa el monto"
                      min="1000"
                      value={formData.customAmount}
                      onChange={(e) => setFormData(prev => ({ ...prev, customAmount: e.target.value }))}
                      required
                    />
                  )}
                </div>

                {/* Checkbox de donación anónima */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={formData.anonymous}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, anonymous: checked === true }))
                    }
                  />
                  <label htmlFor="anonymous" className="text-sm cursor-pointer">
                    Deseo donar de forma anónima
                  </label>
                </div>

                {/* Botón para enviar la donación */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 bg-accent hover:bg-accent/90"
                >
                  <DollarSign className="h-5 w-5" />
                  Donar {finalAmount && `$${parseInt(finalAmount).toLocaleString()} COP`}
                </Button>

                {/* Aviso legal pequeño */}
                <p className="text-xs text-muted-foreground text-center">
                  Al donar, aceptas que tu información será procesada de manera segura. 
                  Todas las donaciones son deducibles de impuestos.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* ======= Sección de impacto visual ======= */}
          <div className="mt-12 text-center">
            <h3 className="font-heading font-bold text-2xl mb-6">El Impacto de tu Donación</h3>
            
            {/* Tres tarjetas con ejemplos del impacto */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Impacto 1 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-secondary mb-2">$30K</div>
                  <p className="text-sm text-muted-foreground">
                    Un mes de alimentación nutritiva para un niño
                  </p>
                </CardContent>
              </Card>

              {/* Impacto 2 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-success mb-2">$50K</div>
                  <p className="text-sm text-muted-foreground">
                    Materiales escolares y uniformes para un semestre
                  </p>
                </CardContent>
              </Card>

              {/* Impacto 3 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-accent mb-2">$100K</div>
                  <p className="text-sm text-muted-foreground">
                    Apoyo integral mensual: educación, salud y nutrición
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Exporta el componente para ser usado en otras partes del proyecto
export default Donations;
