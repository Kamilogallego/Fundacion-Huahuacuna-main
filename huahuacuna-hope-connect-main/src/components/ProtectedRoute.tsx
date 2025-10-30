// Importamos el componente Navigate de react-router-dom.
// Este componente permite redirigir al usuario a otra ruta de forma programática.
import { Navigate } from 'react-router-dom';

// Importamos el hook useAuth y el tipo UserRole desde el contexto de autenticación.
// useAuth nos da acceso al usuario actual y su información.
import { useAuth, type UserRole } from '@/contexts/AuthContext';

// Definimos la interfaz (estructura esperada) de las propiedades que recibe ProtectedRoute.
interface ProtectedRouteProps {
  children: React.ReactNode;  // Los componentes hijos que se renderizarán si el acceso es válido
  allowedRoles?: UserRole[];  // (Opcional) Lista de roles permitidos para acceder a la ruta
}

// Definimos el componente ProtectedRoute.
// Este componente se usa para proteger rutas que requieren autenticación o un rol específico.
export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  // Obtenemos el usuario actual desde el contexto de autenticación.
  const { user } = useAuth();

  // Si no hay usuario autenticado (es decir, no ha iniciado sesión),
  // redirigimos automáticamente a la página de inicio de sesión.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si se especificaron roles permitidos y el rol del usuario no está en esa lista,
  // lo redirigimos a la página principal por no tener permisos suficientes.
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Si el usuario está autenticado y tiene los permisos adecuados,
  // renderizamos los componentes hijos (el contenido protegido).
  return <>{children}</>;
};
