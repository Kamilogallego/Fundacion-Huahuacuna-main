// Importación de componentes reutilizables desde la librería de la app
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Estructura de tarjetas
import { Badge } from '@/components/ui/badge'; // Etiquetas visuales de estado o tipo
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'; // Componentes de tabla personalizados
import { DollarSign, Heart } from 'lucide-react'; // Íconos SVG desde la librería lucide-react

// Datos de ejemplo que simulan el historial de actividades del padrino
const mockHistory = [
  {
    id: '1',
    type: 'sponsorship', // Apadrinamiento
    childName: 'María',
    date: '2024-06-15',
    amount: 50000,
    status: 'active',
  },
  {
    id: '2',
    type: 'donation', // Donación
    date: '2025-01-15',
    amount: 50000,
    status: 'completed',
  },
  {
    id: '3',
    type: 'sponsorship',
    childName: 'Carlos',
    date: '2024-09-20',
    amount: 100000,
    status: 'active',
  },
  {
    id: '4',
    type: 'donation',
    date: '2024-12-15',
    amount: 30000,
    status: 'completed',
  },
  {
    id: '5',
    type: 'donation',
    date: '2024-11-15',
    amount: 50000,
    status: 'completed',
  },
];

// Componente principal que muestra el historial del padrino
const SponsorHistory = () => {
  // Cálculo del monto total donado sumando todos los registros del historial
  const totalDonated = mockHistory.reduce((acc, h) => acc + h.amount, 0);

  // Filtra los apadrinamientos activos del historial
  const sponsorships = mockHistory.filter(h => h.type === 'sponsorship' && h.status === 'active');

  return (
    <div>
      {/* Encabezado de la página */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">Historial</h1>
        <p className="text-muted-foreground">Revisa tu actividad y aportes</p>
      </div>

      {/* Sección de estadísticas rápidas */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Tarjeta: Apadrinamientos activos */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Apadrinamientos Activos</p>
                <h3 className="font-heading font-bold text-3xl">{sponsorships.length}</h3>
              </div>
              <Heart className="h-8 w-8 text-accent" /> {/* Ícono de corazón */}
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta: Total aportado */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Aportado</p>
                {/* Se muestra el total donado en miles con formato abreviado (ej: 230K) */}
                <h3 className="font-heading font-bold text-3xl">
                  ${(totalDonated / 1000).toFixed(0)}K
                </h3>
              </div>
              <DollarSign className="h-8 w-8 text-success" /> {/* Ícono de dinero */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla con el historial de actividades */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            {/* Encabezados de las columnas */}
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Detalle</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>

            {/* Cuerpo de la tabla con los datos dinámicos */}
            <TableBody>
              {mockHistory.map((item) => (
                <TableRow key={item.id}>
                  {/* Tipo de actividad: apadrinamiento o donación */}
                  <TableCell>
                    <Badge variant={item.type === 'sponsorship' ? 'default' : 'secondary'}>
                      {item.type === 'sponsorship' ? 'Apadrinamiento' : 'Donación'}
                    </Badge>
                  </TableCell>

                  {/* Detalle del registro */}
                  <TableCell>
                    {item.type === 'sponsorship'
                      ? `Apadrinamiento de ${item.childName}`
                      : 'Donación general'}
                  </TableCell>

                  {/* Fecha formateada en formato local colombiano */}
                  <TableCell>
                    {new Date(item.date).toLocaleDateString('es-CO')}
                  </TableCell>

                  {/* Monto donado o aportado con formato de miles */}
                  <TableCell className="font-semibold">
                    ${item.amount.toLocaleString()}
                  </TableCell>

                  {/* Estado de la operación: activo o completado */}
                  <TableCell>
                    <Badge variant={item.status === 'active' ? 'default' : 'outline'}>
                      {item.status === 'active' ? 'Activo' : 'Completado'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Exporta el componente para usarlo dentro del layout del padrino
export default SponsorHistory;
