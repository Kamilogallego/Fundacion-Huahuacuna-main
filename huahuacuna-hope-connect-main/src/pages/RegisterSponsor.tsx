// ====================== RegisterSponsor.tsx ======================
// Importa hooks y componentes necesarios desde React y otras librerías
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

// Componente principal de registro de padrinos
const RegisterSponsor = () => {
  // useState para controlar el paso actual del formulario (1, 2 o 3)
  const [step, setStep] = useState(1);

  // useState para manejar los datos del formulario
  const [formData, setFormData] = useState({
    fullName: '',
    documentType: '', // NUEVO: tipo de documento
    document: '',
    birthDate: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    occupation: '',
    company: '',
    experience: '',
    reference: '',
    motivation: '',
    acceptTerms: false,
    image: null as File | null, // NUEVO: campo de imagen
  });

  // Estado para previsualizar la imagen
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Maneja los cambios de texto o textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Maneja la carga de la imagen y genera una vista previa
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Maneja el envío final del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      // Crea un objeto FormData para incluir la imagen y demás campos
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) dataToSend.append(key, value as any);
      });

      // Llama a la función register del contexto o API
      await register(dataToSend);

      toast.success('Solicitud enviada con éxito');
      toast.info('Será revisada por la Fundación Huahuacuna. Recibirás respuesta por correo electrónico.');

      // Redirige al inicio
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      toast.error('Error al enviar la solicitud');
    }
  };

  // Render del formulario
  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 bg-muted">
      <div className="container mx-auto max-w-3xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-accent" />
            </div>
            <CardTitle className="font-heading text-3xl">Solicitud de Apadrinamiento</CardTitle>
            <CardDescription>
              Paso {step} de 3 - {step === 1 ? 'Datos Personales' : step === 2 ? 'Información Profesional' : 'Motivación'}
            </CardDescription>

            <div className="flex gap-2 justify-center mt-4">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-2 w-16 rounded-full ${s <= step ? 'bg-accent' : 'bg-muted'}`} />
              ))}
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* ================= PASO 1: Datos Personales ================= */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* Nombre, tipo de documento y número */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nombre Completo *</Label>
                      <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documentType">Tipo de Documento *</Label>
                      <select
                        id="documentType"
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full bg-white"
                      >
                        <option value="">Selecciona...</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PAS">Pasaporte</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document">Número de Documento *</Label>
                      <Input id="document" name="document" value={formData.document} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Imagen o documento */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Sube una foto o documento de identidad *</Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                    {imagePreview && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
                        <img
                          src={imagePreview}
                          alt="Vista previa"
                          className="rounded-lg border w-40 h-40 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Fecha de nacimiento y ciudad */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                      <Input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección *</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>

                  {/* Teléfono y correo */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
              )}

              {/* ================= PASO 2: Información Profesional ================= */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Ocupación *</Label>
                    <Input id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa o Trabajo Actual *</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Años de Experiencia *</Label>
                    <Input id="experience" name="experience" type="number" min="0" value={formData.experience} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference">Referencia Personal (Nombre y Teléfono) *</Label>
                    <Input id="reference" name="reference" value={formData.reference} onChange={handleChange} required />
                  </div>
                </div>
              )}

              {/* ================= PASO 3: Motivación ================= */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="motivation">¿Por qué deseas apadrinar un niño? *</Label>
                    <Textarea id="motivation" name="motivation" value={formData.motivation} onChange={handleChange} rows={6} required placeholder="Comparte tu motivación para ser padrino..." />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, acceptTerms: checked === true }))
                      }
                    />
                    <label htmlFor="acceptTerms" className="text-sm leading-relaxed cursor-pointer">
                      Acepto los términos y condiciones de confidencialidad de la Fundación Huahuacuna
                    </label>
                  </div>
                </div>
              )}

              {/* ================= BOTONES DE NAVEGACIÓN ================= */}
              <div className="flex gap-3 pt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                    <ChevronLeft className="h-4 w-4" /> Anterior
                  </Button>
                )}

                {step < 3 ? (
                  <Button type="button" onClick={() => setStep(step + 1)} className="ml-auto gap-2 bg-accent hover:bg-accent/90">
                    Siguiente <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto gap-2 bg-success hover:bg-success/90">
                    <Heart className="h-4 w-4" /> Enviar Solicitud
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterSponsor;
