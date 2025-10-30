// Importa componentes reutilizables de la interfaz de usuario
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

// Importa los componentes de tabla personalizados
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Importa íconos de la librería 'lucide-react' para decoración visual
import { Search, Heart, DollarSign } from 'lucide-react';

// Define la interfaz TypeScript que describe la estructura de un apadrinamiento
interface Sponsorship {
  id: string;               // Identificador único
  childName: string;        // Nombre del niño
  childAge: number;         // Edad del niño
  sponsorName: string;      // Nombre del padrino
  sponsorEmail: string;     // Correo electrónico del padrino
  startDate: string;        // Fecha en que comenzó el apadrinamiento
  monthlyAmount: number;    // Monto aportado mensualmente
  totalDonated: number;     // Total acumulado donado
  status: 'active' | 'inactive'; // Estado del apadrinamiento
}

// Datos simulados de ejemplo (mock) que imitan registros reales de apadrinamientos
const mockSponsorships: Sponsorship[] = [
  {
    id: '1',
    childName: 'María',
    childAge: 7,
    sponsorName: 'Juan Pérez',
    sponsorEmail: 'juan.perez@email.com',
    startDate: '2024-06-15',
    monthlyAmount: 50000,
    totalDonated: 350000,
    status: 'active',
  },
  {
    id: '2',
    childName: 'Carlos',
    childAge: 9,
    sponsorName: 'María García',
    sponsorEmail: 'maria.garcia@email.com',
    startDate: '2024-08-20',
    monthlyAmount: 100000,
    totalDonated: 500000,
    status: 'active',
  },
  {
    id: '3',
    childName: 'Sofía',
    childAge: 6,
    sponsorName: 'Carlos Rodríguez',
    sponsorEmail: 'carlos.rodriguez@email.com',
    startDate: '2024-09-10',
    monthlyAmount: 30000,
    totalDonated: 120000,
    status: 'active',
  },
  {
    id: '4',
    childName: 'Juan',
    childAge: 8,
    sponsorName: 'Ana Martínez',
    sponsorEmail: 'ana.martinez@email.com',
    startDate: '2024-07-05',
    monthlyAmount: 50000,
    totalDonated: 300000,
    status: 'active',
  },
  {
    id: '5',
    childName: 'Ana',
    childAge: 10,
    sponsorName: 'Luis Fernández',
    sponsorEmail: 'luis.fernandez@email.com',
    startDate: '2024-10-01',
    monthlyAmount: 50000,
    totalDonated: 150000,
    status: 'active',
  },
];

// Componente principal: administra la vista del panel de apadrinamientos
const AdminSponsorships = () => {
  // Estado local que almacena el texto del campo de búsqueda
  const [search, setSearch] = useState('');

  // Filtra los apadrinamientos según el texto de búsqueda (por niño, padrino o correo)
  const filteredSponsorships = mockSponsorships.filter(
    s =>
      s.childName.toLowerCase().includes(search.toLowerCase()) ||
      s.sponsorName.toLowerCase().includes(search.toLowerCase()) ||
      s.sponsorEmail.toLowerCase().includes(search.toLowerCase())
  );

  // Calcula el total recaudado sumando todas las donaciones
  const totalDonated = mockSponsorships.reduce((acc, s) => acc + s.totalDonated, 0);

  // Cuenta la cantidad de apadrinamientos activos
  const activeSponsorships = mockSponsorships.filter(s => s.status === 'active').length;

  return (
    <div>
      {/* Encabezado de la sección */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">Base de Datos de Apadrinamientos</h1>
        <p className="text-muted-foreground">
          Relación completa de padrinos y niños apadrinados
        </p>
      </div>

      {/* Tarjetas de resumen de estadísticas */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: cantidad de apadrinamientos activos */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Apadrinamientos Activos</p>
                <h3 className="font-heading font-bold text-3xl">{activeSponsorships}</h3>
              </div>
              <Heart className="h-8 w-8 text-accent" /> {/* ícono decorativo */}
            </div>
          </CardContent>
        </Card>

        {/* Card 2: total recaudado */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Recaudado</p>
                <h3 className="font-heading font-bold text-3xl">
                  ${(totalDonated / 1000000).toFixed(1)}M
                </h3>
              </div>
              <DollarSign className="h-8 w-8 text-success" /> {/* ícono decorativo */}
            </div>
          </CardContent>
        </Card>

        {/* Card 3: promedio mensual de aportes */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Promedio Mensual</p>
                <h3 className="font-heading font-bold text-3xl">
                  ${
                    Math.round(
                      mockSponsorships.reduce((acc, s) => acc + s.monthlyAmount, 0) /
                      mockSponsorships.length /
                      1000
                    )
                  }K
                </h3>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla con la base de datos de apadrinamientos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Apadrinamientos ({filteredSponsorships.length})</CardTitle>

            {/* Barra de búsqueda con ícono */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por niño o padrino..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} // actualiza el estado al escribir
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Estructura de la tabla */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Niño</TableHead>
                <TableHead>Padrino</TableHead>
                <TableHead>Correo Padrino</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Aporte Mensual</TableHead>
                <TableHead>Total Donado</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Itera sobre los apadrinamientos filtrados */}
              {filteredSponsorships.map((sponsorship) => (
                <TableRow key={sponsorship.id}>
                  <TableCell className="font-medium">
                    {sponsorship.childName} ({sponsorship.childAge} años)
                  </TableCell>
                  <TableCell>{sponsorship.sponsorName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {sponsorship.sponsorEmail}
                  </TableCell>
                  <TableCell>
                    {new Date(sponsorship.startDate).toLocaleDateString('es-CO')}
                  </TableCell>
                  <TableCell>
                    ${sponsorship.monthlyAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${sponsorship.totalDonated.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={sponsorship.status === 'active' ? 'default' : 'secondary'}>
                      {sponsorship.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Mensaje si no hay resultados para la búsqueda */}
          {filteredSponsorships.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No se encontraron resultados para "{search}"
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Exporta el componente para ser utilizado en otras partes del sistema
export default AdminSponsorships;
