import request from "supertest";
import { app, server } from "../app";
import connection_db from "../database/db";
import postModel from "../models/postsModel";

describe("CRUD posts", () => {
  let token: string;
  let userId: number; // Variable para almacenar el ID del usuario creado

  // Registrar un usuario y obtener el token
  beforeAll(async () => {
    const userData = {
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      role: "user", // Asegúrate de incluir el role
    };

    // Crear un usuario a través del endpoint de registro y obtener el token
    const registerResponse = await request(app)
      .post("/auth/register")  // Usamos el endpoint de registro
      .send(userData);

    token = registerResponse.body.token;  // Token obtenido del registro
  
    // Ahora, obtén el ID del usuario desde la base de datos
    const userResponse = await request(app)
      .post("/auth/login")  // Usamos login si es necesario para obtener detalles del usuario
      .send({
        email: userData.email,
        password: userData.password
      });

    userId = userResponse.body.user.id;  // Asumimos que el login devuelve el ID del usuario
  
  });

  // GET ALL POSTS
  test("should return a response with 200 and type json", async () => {
    const response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`); // Incluir el token en los headers

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
  });

  // GET POST BY ID
  test("should get a post by ID", async () => {
    const postData = {
      title: "titulo del test de post para el get by id",
      content: "contenido del test de post",
      category: 'adopciones' as 'noticias' | 'cuidado_animal' | 'adopciones',
      status: 'inactive' as 'active' | 'inactive',
      like_count: 2,
      url_images: "Url del test de post",
      date: new Date(),
      user_id: userId, // Usamos el user_id creado
    };

    const createResponse = await postModel.create(postData)

    const postId = createResponse.id;

    const getResponse = await request(app)
      .get(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.title).toBe(postData.title);
    expect(getResponse.body.content).toBe(postData.content);
    expect(getResponse.body.url_images).toBe(postData.url_images);

  });

//   // POST POST
//   test("should create a post", async () => {
//     const postData = {
//       title: "titulo del test de post para el post",
//       content: "contenido del test de post",
//       user_id: userId, // Usamos el user_id creado
//       category: "cuidado_animal",
//       status: "inactive",
//       like_count: 2,
//       url_images: "Url del test de post",
//       date: "fecha del test de post",
//     };

//     const response = await request(app)
//       .post("/posts")
//       .set("Authorization", `Bearer ${token}`)
//       .send(postData);

//     expect(response.statusCode).toBe(201);
//     expect(response.body.title).toBe(postData.title);
//     expect(response.body.content).toBe(postData.content);
//     expect(response.body.user_id).toBe(postData.user_id);
//     expect(response.body.category).toBe(postData.category);
//     expect(response.body.status).toBe(postData.status);
//     expect(response.body.like_count).toBe(postData.like_count);
//     expect(response.body.url_images).toBe(postData.url_images);
//     expect(response.body.date).toBe(postData.date);
//     expect(response.body.id).toBeDefined();  // Verificar que se haya creado un ID
//   });

//   // DELETE POST
//   test("should delete a post by ID", async () => {
//     const postData = {
//       title: "titulo del test de post para el delete",
//       content: "contenido del test de post",
//       category: "cuidado_animal",
//       status: "inactive",
//       like_count: 2,
//       url_images: "Url del test de post",
//       date: "fecha del test de post",
//       user_id: userId, // Usamos el user_id creado
//     };

//     const createResponse = await request(app)
//       .post("/posts")
//       .set("Authorization", `Bearer ${token}`)
//       .send(postData);

//     const postId = createResponse.body.id;

//     const deleteResponse = await request(app)
//       .delete(`/posts/${postId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(deleteResponse.statusCode).toBe(200);
//     expect(deleteResponse.body.message).toBe("Post eliminado correctamente");
//   });

//   // UPDATE POST
//   test("should update a post by ID", async () => {
//     const postData = {
//       title: "titulo del test de post para el update",
//       content: "contenido del test de post",
//       category: "cuidado_animal",
//       status: "inactive",
//       like_count: 2,
//       url_images: "Url del test de post",
//       date: "fecha del test de post",
//       user_id: userId, // Usamos el user_id creado
//     };

//     const createResponse = await request(app)
//       .post("/posts")
//       .set("Authorization", `Bearer ${token}`)
//       .send(postData);

//     const postId = createResponse.body.id;

//     const updateData = {
//       title: "titulo actualizado del test de post para el update",
//       content: "contenido actualizado del test de post",
//       category: "cuidado_animal",
//       status: "inactive",
//       like_count: 2,
//       url_images: "Url actualizada del test de post",
//       date: "fecha actualizada del test de post",
//     };

//     const updateResponse = await request(app)
//       .put(`/posts/${postId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(updateData);

//     expect(updateResponse.statusCode).toBe(200);
//     expect(updateResponse.body.title).toBe(updateData.title);
//     expect(updateResponse.body.content).toBe(updateData.content);
//     expect(updateResponse.body.category).toBe(updateData.category);
//     expect(updateResponse.body.status).toBe(updateData.status);
//     expect(updateResponse.body.like_count).toBe(updateData.like_count);
//     expect(updateResponse.body.url_images).toBe(updateData.url_images);
//     expect(updateResponse.body.date).toBe(updateData.date);
//   });

  // Cerrar el servidor y la base de datos después de las pruebas
  afterAll(async () => {
    // Cerrar el servidor y la base de datos después de las pruebas
    await server.close(); // Cierra el servidor de Express
    await connection_db.close();  // Cierra la conexión a la base de datos
  });
});
