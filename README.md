# App Fotaza 

Es una aplicacion donde distintos usuarios podrán subir sus imágenes, con y sin copyright. En ella podrán interactuar, haciendo que tenga una mayor exposición a los usuarios registrados cuando más interacciones tenga. Además podrán mostrarse interesados y vender las mismas. 

## Tecnologías utilizadas

- **Node.js** con **Express 5**
- **PostgreSQL** como base de datos
- **Sequelize** como ORM
- **Pug** como motor de plantillas
- **Tailwind CSS** via CDN
- **express-session** para autenticación
- **bcrypt** para encriptación de contraseñas

## Requisitos previos

- Node.js instalado
- PostgreSQL instalado y corriendo
- Crear una base de datos llamada `fotaza` antes de correr el proyecto

## Instalación

1. Clonar el repositorio
2. Instalar dependencias
```bash
npm install
```
3. Configurar variables de entorno (ver `.env.example`)
4. Crear las tablas
```bash
npm run db:init
```
5. Plantar seedss
```bash
npm run db:seed
```
6. Iniciar el servidor
```bash
npm start
```
La aplicación estará disponible en `http://localhost:3000`

## Variables de entorno

Crear un archivo `.env` en la raíz con las siguientes variables:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| PORT | Puerto del servidor | 3000 |
| DB_NAME | Nombre de la base de datos | fotaza |
| DB_USER | Usuario de PostgreSQL | postgres |
| DB_PASS | Contraseña de PostgreSQL | 123 o la que tengas |
| DB_HOST | Host de la base de datos | localhost |
| DB_PORT | Puerto de PostgreSQL | 5432 |
| SESSION_SECRET | Clave secreta para sesiones | boquitabocaboca |

## Usuarios de prueba

| Usuario | Email | Contraseña | Rol |
|---------|-------|------------|-----|
| juani | juanig@g | 123456 | usuario |
| Pia | pi@g | 123456 | usuario |
| Maxi | max@g | 123456 | usuario |

## Funcionalidades implementadas

- Registro e inicio de sesión de usuarios
- Publicación de imágenes con título, descripción y etiquetas
- Licencias con y sin copyright
- Valoración de imágenes con sistema de estrellas
- Comentarios en imágenes
- Seguimiento de usuarios
- Buscador por título, autor y etiqueta
- Perfil de usuario

## Problemas encontrados y soluciones

### Almacenamiento de imágenes
Inicialmente se evaluó usar **Multer** para guardar imágenes en disco o servicios como **Cloudinary**. Se decidió usar **Base64** para codificar las imágenes directamente en la base de datos, ya que es la solución vista en clase y simplifica el deploy sin depender de servicios externos.

### Sesiones en desarrollo
Las sesiones se almacenan en memoria, por lo que se pierden al reiniciar el servidor durante el desarrollo con `--watch`. Esto es esperado y no ocurre en producción.

**Nota**: Compartiré un backup de la base de datos que debería tener las mismas contraseñas o 123456789. En esta debería haber publicaciones y alguna interacción entre usuarios. 