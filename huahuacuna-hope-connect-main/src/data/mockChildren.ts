// Importamos imágenes que representarán a los niños ficticios.
// Estas imágenes están almacenadas en la carpeta de assets del proyecto.
import child1 from '@/assets/child-1.jpg';
import child2 from '@/assets/child-2.jpg';
import child3 from '@/assets/child-3.jpg';

// Definimos una interfaz llamada 'Child' que describe la estructura
// que debe tener cada objeto niño en nuestro sistema.
export interface Child {
  id: string;             // Identificador único del niño.
  name: string;           // Nombre del niño.
  age: number;            // Edad del niño.
  image: string;          // URL o referencia a la imagen del niño.
  description: string;    // Descripción o biografía corta del niño.
  sponsored: boolean;     // Indica si el niño ya fue apadrinado (true) o no (false).
  sponsorId?: string;     // (Opcional) ID del padrino si está apadrinado.
  sponsorName?: string;   // (Opcional) Nombre del padrino.
  sponsorshipDate?: string; // (Opcional) Fecha en que se realizó el apadrinamiento.
}

// Exportamos un arreglo llamado 'mockChildren' que contiene una lista
// de objetos que simulan los datos de niños en el sistema.
// Esto se usa como ejemplo o datos de prueba antes de conectar con una base real.
export const mockChildren: Child[] = [
  {
    id: '1', // ID único
    name: 'María', // Nombre del niño
    age: 7, // Edad
    image: child1, // Imagen asociada (importada arriba)
    description: 'María es una niña alegre que ama aprender. Sueña con ser maestra para ayudar a otros niños. Disfruta de la lectura y el dibujo.',
    sponsored: false, // Aún no ha sido apadrinada
  },
  {
    id: '2',
    name: 'Carlos',
    age: 9,
    image: child2,
    description: 'Carlos es un niño curioso que ama los libros. Su pasión es la ciencia y sueña con ser médico para ayudar a su comunidad.',
    sponsored: false,
  },
  {
    id: '3',
    name: 'Sofía',
    age: 6,
    image: child3,
    description: 'Sofía tiene un corazón artístico. Le encanta pintar y crear con sus manos. Sueña con ser artista y llenar el mundo de colores.',
    sponsored: false,
  },
  {
    id: '4',
    name: 'Juan',
    age: 8,
    image: child1,
    description: 'Juan es un niño deportista y trabajador. Le gusta el fútbol y sueña con representar a su país. Siempre ayuda a sus compañeros.',
    sponsored: false,
  },
  {
    id: '5',
    name: 'Ana',
    age: 10,
    image: child2,
    description: 'Ana es una niña responsable y dedicada. Le encanta la música y toca la flauta. Sueña con estudiar música y compartir su talento.',
    sponsored: false,
  },
  {
    id: '6',
    name: 'Luis',
    age: 7,
    image: child3,
    description: 'Luis es un niño alegre y amigable. Le fascina la naturaleza y los animales. Sueña con ser veterinario para cuidar a los animales.',
    sponsored: false,
  },
];
