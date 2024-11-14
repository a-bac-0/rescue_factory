# Rescue Factory 🐾

En el corazón de nuestra comunidad, **Rescue Factory** se alza como un faro de esperanza para aquellos amigos de cuatro patas que más lo necesitan. Somos más que un simple refugio; somos una familia dedicada a transformar vidas, tanto de animales como de personas, a través del amor incondicional y el compromiso inquebrantable.

![Home Rescue Factory](./client/src/assets/images/homeRescueFactory.jpg)

---

## Índice 📑

1. [Lo Que Hacemos](#lo-que-hacemos)
2. [Características](#características)
3. [Tecnologías Usadas](#tecnologías-usadas)
4. [Instalación](#instalación)
5. [Recursos](#recursos)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Futuras Mejoras](#futuras-mejoras)

---

## Lo Que Hacemos 🐶🐱

- Rescatamos a perros y gatos en situación de vulnerabilidad.
- Proporcionamos atención veterinaria completa.
- Ofrecemos un ambiente seguro y amoroso durante su recuperación.
- Trabajamos incansablemente en encontrar hogares perfectos para cada uno de nuestros residentes.
- Realizamos un cuidadoso proceso de adopción para asegurar el mejor match entre mascotas y familias.

**Porque creemos que cada vida peluda merece una segunda oportunidad, y cada hogar se hace más feliz con el amor incondicional de una mascota rescatada.**

En **Rescue Factory**, no solo salvamos vidas, creamos familias. 💖

---

## Características ✨

- **Adopciones**: Ver animales disponibles para adopción.
- **Noticias sobre cuidado animal**: Publicaciones sobre el cuidado personal de cada animal.
- **Contacto**: Espacio para resolver dudas y preguntas.
- **Sistema de Logueo**: Permite el registro y acceso de usuarios.

---

## Tecnologías Usadas 💻

Utilizamos una variedad de herramientas y tecnologías para ofrecer la mejor experiencia tanto en el backend como en el frontend:

- ![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=white): Entorno de ejecución para JavaScript en el backend.
- ![Express.js](https://img.shields.io/badge/Express.js-4DB33A?style=for-the-badge&logo=express&logoColor=white): Framework para crear el servidor y manejar las rutas.
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white): Sistema de gestión de bases de datos relacional.
- [![Sequelize](https://img.shields.io/badge/Sequelize-5272B4?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/): ORM para MySQL, que facilita la interacción con la base de datos.
- ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white): Framework para realizar pruebas unitarias.
- ![SuperTest](https://img.shields.io/badge/SuperTest-00BFFF?style=for-the-badge&logo=testing-library&logoColor=white): Herramienta para probar endpoints de la API.
- ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white): Utilizado para probar y documentar las rutas de la API.
- ![React](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white): Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white): Para una navegación fluida y gestión del enrutado con `createBrowserRouter`.
- ![React Hook Form](https://img.shields.io/badge/React--Hook--Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white): Simplifica la gestión de formularios con el hook `useForm`.
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white): Para realizar solicitudes HTTP asíncronas al servidor.
- ![json-server](https://img.shields.io/badge/json--server-323330?style=for-the-badge&logo=json&logoColor=white): Proporciona una API simulada rápida y fácil para las operaciones CRUD.
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white): Para autenticación segura.
- ![Multer](https://img.shields.io/badge/Multer-FF7A3F?style=for-the-badge&logoColor=white): Middleware para manejo de archivos.
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white): Gestión de imágenes y archivos multimedia.


---

## Instalación 🛠️

Sigue estos pasos para instalar y configurar el proyecto:

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/a-bac-0/rescue_factory.git
    ```

2. **Instalar dependencias en el frontend**:

    ```bash
    cd rescue_factory/client
    npm install
    ```

3. **Instalar dependencias en el backend**:

    ```bash
    cd rescue_factory/server
    npm install
    ```

4. **Configurar variables de entorno**:
    Crea un archivo `.env` en el directorio `server` con las siguientes configuraciones:

    ```bash
    DB_PASSWORD="Contraseña de conexión en MySQL Workbench"
    DB_USERNAME="Usuario en Workbench"
    DB_DATABASE=rescue_factory
    DB_TEST_NAME=rescue_factory_test
    DB_HOST=localhost
    DB_DIALECT=mysql
    DB_PORT="El puerto que tengas configurado en Workbench"
    NODE_ENV=development
    JWT_SECRET=contraseña
    ```

5. **Ejecutar el proyecto desde ambos lados (client y server)**:

    ```bash
    npm run dev
    ```

---

## Recursos 📚

- [Diseño de Figma](https://www.figma.com/design/hum3ez7t62ML2RKGUHKgV0/Rescue-Factory?node-id=29-13&node-type=canvas&t=4j8HTuJP0Mtnrd0Q-0)
- [Diseño de la base de datos en DrawSQL](https://drawsql.app/teams/factoria-8/diagrams/rescue-factory)

---

## Estructura del Proyecto 🏗️

La estructura del proyecto es la siguiente:

![Estructura del proyecto](./client/src/assets/images/estructura.jpg)

---

## Futuras Mejoras 🚀

- Panel para administradores con permisos y gestión de usuarios.
- Configuración del validador del token en el frontend para mejorar la seguridad.

---

Gracias por tu interés en **Rescue Factory**. ¡Esperamos que disfrutes contribuyendo a esta causa!
