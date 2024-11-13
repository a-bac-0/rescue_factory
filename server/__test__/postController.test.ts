import connection_db from "../database/db";
import postModel from "../models/postsModel";
import userModel from "../models/usersModel";  // Asegúrate de tener un modelo de usuarios
import request from "supertest";
import { app } from "../app";  // Asegúrate de que tu app esté importada correctamente

describe("CRUD posts with models and token", () => {
  let userId: number;
  let token: string; // Para almacenar el token de autenticación

  // Crear un usuario y obtener su ID y token
  beforeAll(async () => {
    const userData = {
      name: "Test User 41",
      email: "testuser41@example.com",
      password: "password123",
      role: "user",
    };

    // Crear un usuario directamente usando el modelo de usuarios
    const createdUser = await userModel.create(userData);
    userId = createdUser.id;

    // Autenticación para obtener el token
    const loginResponse = await request(app)
      .post("/auth/login")  // Suponiendo que tienes este endpoint para login
      .send({
        email: userData.email,
        password: userData.password,
      });

    token = loginResponse.body.token;  // Obtener el token del login
  });

  // GET ALL POSTS
  test("should get all posts", async () => {
    // Usar el modelo para obtener todos los posts
    const posts = await postModel.findAll();  // Usamos el modelo de posts directamente
    expect(posts).toBeInstanceOf(Array);  // Verificamos que la respuesta sea un array
  });

  // GET POST BY ID
  test("should get a post by ID using model", async () => {
    const postData = {
      title: "Test post for get by ID",
      content: "Content of the test post",
      category: 'adopciones' as 'noticias' | 'cuidado_animal' | 'adopciones',
      status: 'inactive' as 'active' | 'inactive',
      like_count: 2,
      url_images: "Url of the test post",
      date: new Date(),
      user_id: userId,
    };

    const createdPost = await postModel.create(postData); // Crear un post usando el modelo

    const postId = createdPost.id;
    const postFromDb = await postModel.findByPk(postId); // Obtener el post por ID desde la base de datos

    expect(postFromDb).not.toBeNull();  // Verificar que se encontró el post
    expect(postFromDb?.title).toBe(postData.title);
    expect(postFromDb?.content).toBe(postData.content);
  });

  // POST POST
  test("should create a post using the model", async () => {
    const postData = {
      title: "Test post for creation",
      content: "Content of the test post",
      category: 'adopciones' as 'noticias' | 'cuidado_animal' | 'adopciones',
      status: 'inactive' as 'active' | 'inactive',
      like_count: 2,
      url_images: "Url of the test post",
      date: new Date(),
      user_id: userId,
    };

    const createdPost = await postModel.create(postData); // Crear el post directamente usando el modelo

    expect(createdPost.title).toBe(postData.title);
    expect(createdPost.content).toBe(postData.content);
    expect(createdPost.user_id).toBe(postData.user_id);
    expect(createdPost.status).toBe(postData.status);
    expect(createdPost.url_images).toBe(postData.url_images);
    expect(createdPost.id).toBeDefined();  // Verificar que se generó un ID para el post
  });

  // DELETE POST
  test("should delete a post by ID using model", async () => {
    const postData = {
      title: "Test post for delete",
      content: "Content of the test post to delete",
      category: 'cuidado_animal' as 'noticias' | 'cuidado_animal' | 'adopciones',
      status: 'inactive' as 'active' | 'inactive',
      like_count: 2,
      url_images: "Url of the test post",
      date: new Date(),
      user_id: userId,
    };

    const createdPost = await postModel.create(postData); // Crear el post usando el modelo
    const postId = createdPost.id;

    const deletedPost = await postModel.findByPk(postId);
    await deletedPost?.destroy(); // Eliminar el post usando el modelo directamente

    const postAfterDeletion = await postModel.findByPk(postId);
    expect(postAfterDeletion).toBeNull();  // Verificar que el post ya no existe en la base de datos
  });

  // UPDATE POST
  test("should update a post by ID using model", async () => {
    const postData = {
      title: "Test post for update",
      content: "Content of the test post",
      category: 'cuidado_animal' as 'noticias' | 'cuidado_animal' | 'adopciones',
      status: 'inactive' as 'active' | 'inactive',
      like_count: 2,
      url_images: "Url of the test post",
      date: new Date(),
      user_id: userId,
    };

    const createdPost = await postModel.create(postData); // Crear el post usando el modelo
    const postId = createdPost.id;

    const updateData = {
      title: "Updated test post title",
      content: "Updated content of the test post",
      category: 'cuidado_animal' as 'noticias' | 'cuidado_animal' | 'adopciones',
      status: 'active' as 'active' | 'inactive',
      like_count: 10,
      url_images: "Updated url of the test post",
      date: new Date(),
    };

    await createdPost.update(updateData);  // Actualizar el post directamente usando el modelo

    const updatedPost = await postModel.findByPk(postId);  // Obtener el post actualizado

    expect(updatedPost?.title).toBe(updateData.title);
    expect(updatedPost?.content).toBe(updateData.content);
    expect(updatedPost?.status).toBe(updateData.status);
    expect(updatedPost?.like_count).toBe(updateData.like_count);
    expect(updatedPost?.url_images).toBe(updateData.url_images);
  });

  // Cerrar la base de datos después de las pruebas
  afterAll(async () => {
    await connection_db.close();  // Cerrar la conexión a la base de datos
  });
});