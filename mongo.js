const mongoose = require('mongoose');
const Blog = require('./models/blog');

// Datos de los blogs a agregar
const blogs = [
    { title: 'Mi primer blog', author: 'Juan Perez', url: 'https://example.com/blog1', likes: 20 },
    { title: 'Blog de viajes', author: 'Ana López', url: 'https://example.com/blog2', likes: 15 },
    { title: 'Blog de tecnología', author: 'Carlos Gómez', url: 'https://example.com/blog3', likes: 30 },
    { title: 'Blog de cocina', author: 'Laura Martínez', url: 'https://example.com/blog4', likes: 25 },
    { title: 'Blog de música', author: 'David García', url: 'https://example.com/blog5', likes: 18 }
];

// Función para agregar los blogs
async function agregarBlogs() {
    try {
        // Conectar a la base de datos

        // Agregar los blogs uno por uno
        for (const blogData of blogs) {
            // Crear una nueva instancia del modelo de Blog
            const blog = new Blog(blogData);

            // Guardar el blog en la base de datos
            await blog.save();
            console.log(`Blog agregado: ${blog.title}`);
        }

        console.log('Todos los blogs han sido agregados exitosamente.');
    } catch (error) {
        console.error('Error al agregar blogs:', error.message);
    } finally {
        // Desconectar de la base de datos al finalizar
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB.');
    }
}

// Llamar a la función para agregar los blogs
agregarBlogs();
