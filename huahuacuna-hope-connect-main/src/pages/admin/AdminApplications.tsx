// Importación de hooks y componentes necesarios desde React y el sistema de UI
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner'; // Biblioteca para mostrar notificaciones tipo “toast”
import { Eye, Check, X } from 'lucide-react'; // Íconos usados en los botones

// Definición de la interfaz Application, que describe la estructura de cada solicitud
interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Datos simulados (mock) para representar solicitudes iniciales
const mockApplications: Application[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+57 300 123 4567',
    document: '123456789',
    date: '2025-01-15',
    status: 'pending',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria.garcia@email.com',
    phone: '+57 301 234 5678',
    document: '987654321',
    date: '2025-01-10',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+57 302 345 6789',
    document: '456789123',
    date: '2025-01-05',
    status: 'pending',
  },
];

// Componente principal del módulo de administración de solicitudes
const AdminApplications = () => {
  // Estado con la lista de solicitudes (inicialmente usa los datos mock)
  const [applications, setApplications] = useState(mockApplications);

  // Estado para guardar la solicitud seleccionada para ver su detalle
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Controla si se muestra o no el modal con los detalles
  const [showDetail, setShowDetail] = useState(false);

  // Función para aprobar una solicitud
  const handleApprove = (id: string) => {
    // Cambia el estado de la solicitud a 'approved'
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: 'approved' as const } : app))
    );
    toast.success('Solicitud aprobada'); // Muestra mensaje de éxito
    setShowDetail(false); // Cierra el modal
  };

  // Función para rechazar una solicitud
  const handleReject = (id: string) => {
    // Cambia el estado de la solicitud a 'rejected'
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: 'rejected' as const } : app))
    );
    toast.error('Solicitud rechazada'); // Muestra mensaje de error
    setShowDetail(false); // Cierra el modal
  };

  // Función para abrir el modal con el detalle de una solicitud
  const viewDetail = (app: Application) => {
    setSelectedApp(app);
    setShowDetail(true);
  };

  // Calcula cuántas solicitudes están pendientes
  const pendingCount = applications.filter(a => a.status === 'pending').length;

  // Renderizado del componente principal
  return (
    <div>
      {/* Encabezado del panel */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">Solicitudes de Apadrinamiento</h1>
        <p className="text-muted-foreground">
          Revisa y gestiona las solicitudes pendientes
        </p>
      </div>

      {/* Muestra una tarjeta con el número de solicitudes pendientes */}
      {pendingCount > 0 && (
        <Card className="mb-6 bg-secondary/10 border-secondary">
          <CardContent className="pt-6">
            <p className="font-semibold">
              Hay {pendingCount} {pendingCount === 1 ? 'solicitud pendiente' : 'solicitudes pendientes'} de revisión
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tabla con todas las solicitudes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Solicitudes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Mapeo de solicitudes en filas */}
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>
                    {new Date(app.date).toLocaleDateString('es-CO')}
                  </TableCell>
                  <TableCell>
                    {/* Badge (etiqueta) que indica el estado actual */}
                    <Badge
                      variant={
                        app.status === 'approved'
                          ? 'default'
                          : app.status === 'rejected'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {app.status === 'pending' && 'Pendiente'}
                      {app.status === 'approved' && 'Aprobado'}
                      {app.status === 'rejected' && 'Rechazado'}
                    </Badge>
                  </TableCell>
                  {/* Botones de acciones */}
                  <TableCell className="text-right space-x-2">
                    {/* Botón para ver detalles */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => viewDetail(app)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    {/* Solo se muestran los botones de aprobar y rechazar si está pendiente */}
                    {app.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(app.id)}
                          className="bg-success hover:bg-success/90"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Aprobar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(app.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Rechazar
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para mostrar el detalle de una solicitud */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              Detalle de Solicitud
            </DialogTitle>
          </DialogHeader>

          {/* Si hay una solicitud seleccionada, se muestran sus detalles */}
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nombre Completo</p>
                  <p className="font-semibold">{selectedApp.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Documento</p>
                  <p className="font-semibold">{selectedApp.document}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Correo</p>
                  <p className="font-semibold">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-semibold">{selectedApp.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Solicitud</p>
                  <p className="font-semibold">
                    {new Date(selectedApp.date).toLocaleDateString('es-CO')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <Badge
                    variant={
                      selectedApp.status === 'approved'
                        ? 'default'
                        : selectedApp.status === 'rejected'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {selectedApp.status === 'pending' && 'Pendiente'}
                    {selectedApp.status === 'approved' && 'Aprobado'}
                    {selectedApp.status === 'rejected' && 'Rechazado'}
                  </Badge>
                </div>
              </div>

              {/* Botones de acción dentro del modal (solo si está pendiente) */}
              {selectedApp.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleApprove(selectedApp.id)}
                    className="flex-1 bg-success hover:bg-success/90"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Aprobar Solicitud
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedApp.id)}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rechazar
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Exportación del componente para poder usarlo en otras partes del proyecto
export default AdminApplications;
