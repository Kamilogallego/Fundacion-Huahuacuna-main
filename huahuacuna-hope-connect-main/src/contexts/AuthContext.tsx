// Importamos funciones y tipos esenciales de React y React Router
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Definimos los posibles roles de usuario en el sistema.
// Puede ser "admin", "sponsor" o null (sin sesión iniciada).
export type UserRole = 'admin' | 'sponsor' | null;

// Definimos la estructura del objeto de usuario.
// Este tipo describe qué datos se almacenan por cada usuario autenticado.
interface User {
  id: string;           // Identificador único del usuario
  email: string;        // Correo electrónico
  role: UserRole;       // Rol del usuario (admin o patrocinador)
  name: string;         // Nombre mostrado
  approved?: boolean;   // (Opcional) Indica si el usuario ha sido aprobado
}

// Definimos el tipo del contexto de autenticación (AuthContextType)
// Este describe qué funciones y datos estarán disponibles globalmente.
interface AuthContextType {
  user: User | null;                                    // Usuario autenticado actual (o null)
  login: (email: string, password: string) => Promise<void>; // Función para iniciar sesión
  logout: () => void;                                   // Función para cerrar sesión
  register: (data: any) => Promise<void>;               // Función para registrar nuevos usuarios
}

// Creamos el contexto de autenticación.
// El contexto servirá para compartir los datos del usuario en toda la aplicación.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para acceder fácilmente al contexto desde cualquier componente.
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Si el hook se usa fuera del AuthProvider, se lanza un error.
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Componente proveedor del contexto de autenticación.
// Este envolverá a toda la aplicación para que los datos del usuario sean globales.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Estado local que guarda la información del usuario autenticado.
  const [user, setUser] = useState<User | null>(null);

  // Hook para redireccionar programáticamente a otras rutas.
  const navigate = useNavigate();

  // useEffect que se ejecuta una vez al montar el componente.
  // Verifica si existe una sesión de usuario guardada en el almacenamiento local (localStorage).
  useEffect(() => {
    const storedUser = localStorage.getItem('huahuacuna_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Si existe, se carga en el estado
    }
  }, []);

  // Función asíncrona de inicio de sesión.
  const login = async (email: string, password: string) => {
    // Simula un pequeño retraso (como si fuera una llamada a API real).
    await new Promise(resolve => setTimeout(resolve, 500));

    // Caso 1: Usuario administrador (credenciales fijas de demostración)
    if (email === 'admin@huahuacuna.org' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        email,
        role: 'admin',
        name: 'Administrador'
      };
      setUser(adminUser); // Guardamos al usuario en el estado
      localStorage.setItem('huahuacuna_user', JSON.stringify(adminUser)); // Lo guardamos en localStorage
      navigate('/admin/dashboard'); // Redirigimos al panel de administración

    // Caso 2: Usuario patrocinador (valida formato de email y longitud del password)
    } else if (email.includes('@') && password.length >= 6) {
      const sponsorUser: User = {
        id: '2',
        email,
        role: 'sponsor',
        name: email.split('@')[0], // Toma el nombre antes del '@' como nombre visible
        approved: true
      };
      setUser(sponsorUser);
      localStorage.setItem('huahuacuna_user', JSON.stringify(sponsorUser));
      navigate('/apadrinador/catalogo'); // Redirige al catálogo de apadrinamiento

    // Caso 3: Credenciales inválidas
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  // Función para cerrar sesión.
  const logout = () => {
    setUser(null); // Elimina los datos del usuario del estado
    localStorage.removeItem('huahuacuna_user'); // Borra la sesión del almacenamiento local
    navigate('/'); // Redirige a la página de inicio
  };

  // Función simulada de registro de usuario.
  const register = async (data: any) => {
    // Simula un pequeño retraso, como si se enviara la información al servidor.
    await new Promise(resolve => setTimeout(resolve, 800));
    // En una aplicación real, aquí se enviaría la información al backend
    // para crear una cuenta nueva o enviar una solicitud de aprobación.
  };

  // Retornamos el contexto, haciendo disponibles las funciones y el usuario actual
  // a todos los componentes hijos de este proveedor.
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
