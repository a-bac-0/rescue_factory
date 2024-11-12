// import request from "supertest";
// import { app, server } from "../app";
// import connection_db from "../database/db";

// describe("CRUD posts", () => {
//     // GET ALL POSTS
//     test("should return a response with 200 and type json", async () => {
//         const response = await request(app).get("/posts");
//         expect(response.statusCode).toBe(200);
//         expect(response.headers["content-type"]).toContain("application/json");
//     });

//     // GET POST BY ID
//     test("should get a post by ID", async () => {
//         const postData = {
//             title: "titulo del test de post para el get by id",
//             content: "contenido del test de post",
//             category: "cuidado_animal",
//             status: "inactive",
//             like_count: 2,
//             url_images: "Url del test de post",
//             date: "fecha del test de post"
//         };
//         const createResponse = await request(app).post("/posts").send(postData);
//         const postId = createResponse.body.id;

//         const getResponse = await request(app).get(`/posts/${postId}`);

//         expect(getResponse.statusCode).toBe(200);

//         // Comparar los datos recibidos con los datos enviados
//         expect(getResponse.body.title).toBe(postData.title);
//         expect(getResponse.body.content).toBe(postData.content);
//         expect(getResponse.body.category).toBe(postData.category);
//         expect(getResponse.body.status).toBe(postData.status);
//         expect(getResponse.body.like_count).toBe(postData.like_count);
//         expect(getResponse.body.url_images).toBe(postData.url_images);
//         expect(getResponse.body.date).toBe(postData.date);
//         expect(getResponse.body.id).toBe(postId);  // Verificar que el ID coincida
//     });

//     // POST POST
//     test("should create a post", async () => {
//         const postData = {
//             title: "titulo del test de post para el post",
//             content: "contenido del test de post",
//             category: "cuidado_animal",
//             status: "inactive",
//             like_count: 2,
//             url_images: "Url del test de post",
//             date: "fecha del test de post"
//         };

//         const response = await request(app).post("/posts").send(postData);

//         expect(response.statusCode).toBe(201);
//         expect(response.body.title).toBe(postData.title);
//         expect(response.body.content).toBe(postData.content);
//         expect(response.body.category).toBe(postData.category);
//         expect(response.body.status).toBe(postData.status);
//         expect(response.body.like_count).toBe(postData.like_count);
//         expect(response.body.url_images).toBe(postData.url_images);
//         expect(response.body.date).toBe(postData.date);
//         expect(response.body.id).toBeDefined();  // Verificar que se haya creado un ID
//     });

//     // DELETE POST
//     test("should delete a post by ID", async () => {
//         const postData = {
//             title: "titulo del test de post para el delete",
//             content: "contenido del test de post",
//             category: "cuidado_animal",
//             status: "inactive",
//             like_count: 2,
//             url_images: "Url del test de post",
//             date: "fecha del test de post"
//         };

//         const createResponse = await request(app).post("/posts").send(postData);
//         const postId = createResponse.body.id;

//         const deleteResponse = await request(app).delete(`/posts/${postId}`);

//         expect(deleteResponse.statusCode).toBe(200); // Código esperado para la operación delete
//         expect(deleteResponse.body.message).toBe("Post eliminado correctamente"); // Mensaje de respuesta esperado
//     });

//     // UPDATE POST
//     test("should update a post by ID", async () => {
//         const postData = {
//             title: "titulo del test de post para el update",
//             content: "contenido del test de post",
//             category: "cuidado_animal",
//             status: "inactive",
//             like_count: 2,
//             url_images: "Url del test de post",
//             date: "fecha del test de post"
//         };
//         const createResponse = await request(app).post("/posts").send(postData);
//         const postId = createResponse.body.id;

//         const updateData = {
//             title: "titulo actualizado del test de post para el update",
//             content: "contenido actualizado del test de post",
//             category: "cuidado_animal",
//             status: "inactive",
//             like_count: 2,
//             url_images: "Url actualizada del test de post",
//             date: "fecha actualizada del test de post"
//         };

//         const updateResponse = await request(app).put(`/posts/${postId}`).send(updateData);

//         expect(updateResponse.statusCode).toBe(200); // Código esperado para la operación update

//         expect(updateResponse.body.title).toBe(updateData.title);
//         expect(updateResponse.body.content).toBe(updateData.content);
//         expect(updateResponse.body.category).toBe(updateData.category);
//         expect(updateResponse.body.status).toBe(updateData.status);
//         expect(updateResponse.body.like_count).toBe(updateData.like_count);
//         expect(updateResponse.body.url_images).toBe(updateData.url_images);
//         expect(updateResponse.body.date).toBe(updateData.date);
//     });

//     // Cerrar el servidor y la base de datos después de las pruebas
//     afterAll(async () => {
//         server.close();  // Cierra el servidor
//         await connection_db.close();  // Cierra la conexión a la base de datos
//     });
// });
