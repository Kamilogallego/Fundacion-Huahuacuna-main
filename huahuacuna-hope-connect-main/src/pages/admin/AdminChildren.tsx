// Importaciones principales
import { useState } from 'react'; // Hook de React para manejar estado local
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Componentes de tarjeta reutilizables
import { Button } from '@/components/ui/button'; // Botón estilizado
import { Input } from '@/components/ui/input'; // Campo de entrada de texto
import { Label } from '@/components/ui/label'; // Etiquetas de formularios
import { Textarea } from '@/components/ui/textarea'; // Campo de texto largo
import { Badge } from '@/components/ui/badge'; // Etiqueta visual para estados
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'; // Componentes para construir una tabla
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'; // Componentes para modales (ventanas emergentes)
import { mockChildren, type Child } from '@/data/mockChildren'; // Datos iniciales de ejemplo (niños)
import { toast } from 'sonner'; // Librería para notificaciones visuales
import { Plus, Edit, Trash2 } from 'lucide-react'; // Íconos de acciones comunes

// Componente principal del panel de gestión de niños
const AdminChildren = () => {
  // Estado que contiene la lista actual de niños
  const [children, setChildren] = useState(mockChildren);

  // Estado para controlar si se muestra el modal de "Agregar niño"
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Estado para guardar el niño que se está editando actualmente
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  // Estado del formulario (para agregar o editar un niño)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    description: '',
  });

  // --- FUNCIONES PRINCIPALES ---

  // Agregar un nuevo niño al catálogo
  const handleAdd = () => {
    // Validación: todos los campos deben estar completos
    if (!formData.name || !formData.age || !formData.description) {
      toast.error('Todos los campos son requeridos');
      return;
    }

    // Crea un nuevo objeto de tipo Child
    const newChild: Child = {
      id: String(children.length + 1), // Genera un ID incremental
      name: formData.name,
      age: parseInt(formData.age), // Convierte la edad de texto a número
      image: mockChildren[0].image, // Usa una imagen de ejemplo
      description: formData.description,
      sponsored: false, // Por defecto, el niño no está apadrinado
    };

    // Actualiza la lista de niños agregando el nuevo al final
    setChildren(prev => [...prev, newChild]);

    // Muestra notificación de éxito
    toast.success('Niño agregado exitosamente');

    // Cierra el modal y limpia el formulario
    setShowAddDialog(false);
    setFormData({ name: '', age: '', description: '' });
  };

  // Inicia el proceso de edición llenando el formulario con los datos actuales
  const handleEdit = (child: Child) => {
    setEditingChild(child);
    setFormData({
      name: child.name,
      age: String(child.age),
      description: child.description,
    });
  };

  // Guarda los cambios después de editar
  const handleUpdate = () => {
    if (!editingChild) return; // Si no hay niño seleccionado, no hace nada

    // Recorre la lista y actualiza solo el niño editado
    setChildren(prev =>
      prev.map(c =>
        c.id === editingChild.id
          ? { ...c, name: formData.name, age: parseInt(formData.age), description: formData.description }
          : c
      )
    );

    // Muestra confirmación
    toast.success('Niño actualizado exitosamente');

    // Limpia los estados
    setEditingChild(null);
    setFormData({ name: '', age: '', description: '' });
  };

  // Elimina un niño del catálogo por ID
  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este niño del catálogo?')) {
      // Filtra la lista para remover al niño con el ID indicado
      setChildren(prev => prev.filter(c => c.id !== id));
      toast.success('Niño eliminado del catálogo');
    }
  };

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <div>
      {/* ENCABEZADO DE LA PÁGINA */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-3xl mb-2">Gestión de Catálogo</h1>
          <p className="text-muted-foreground">Administra los niños del programa</p>
        </div>

        {/* BOTÓN + MODAL PARA AGREGAR NUEVO NIÑO */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-success hover:bg-success/90">
              <Plus className="h-4 w-4" />
              Agregar Niño
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">
                Agregar Nuevo Niño
              </DialogTitle>
            </DialogHeader>

            {/* FORMULARIO DE REGISTRO DE NIÑO */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Edad *</Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="18"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <Button onClick={handleAdd} className="w-full bg-success hover:bg-success/90">
                Agregar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* TABLA DE NIÑOS */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Niños ({children.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foto</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Recorre y muestra cada niño del catálogo */}
              {children.map((child) => (
                <TableRow key={child.id}>
                  <TableCell>
                    <img
                      src={child.image}
                      alt={child.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{child.name}</TableCell>
                  <TableCell>{child.age} años</TableCell>
                  <TableCell>
                    {/* Etiqueta que indica si está apadrinado o disponible */}
                    <Badge variant={child.sponsored ? 'default' : 'secondary'}>
                      {child.sponsored ? 'Apadrinado' : 'Disponible'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {/* MODAL PARA EDITAR DATOS */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(child)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-heading text-2xl">
                            Editar Información
                          </DialogTitle>
                        </DialogHeader>

                        {/* FORMULARIO DE EDICIÓN */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Nombre *</Label>
                            <Input
                              id="edit-name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData(prev => ({ ...prev, name: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-age">Edad *</Label>
                            <Input
                              id="edit-age"
                              type="number"
                              min="1"
                              max="18"
                              value={formData.age}
                              onChange={(e) =>
                                setFormData(prev => ({ ...prev, age: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">Descripción *</Label>
                            <Textarea
                              id="edit-description"
                              rows={4}
                              value={formData.description}
                              onChange={(e) =>
                                setFormData(prev => ({ ...prev, description: e.target.value }))
                              }
                            />
                          </div>
                          <Button
                            onClick={handleUpdate}
                            className="w-full bg-primary hover:bg-primary/90"
                          >
                            Actualizar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* BOTÓN PARA ELIMINAR NIÑO */}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(child.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
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

// Exporta el componente
export default AdminChildren;
