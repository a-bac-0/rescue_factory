import request from "supertest";
import { app } from "../app";
import userModel from "../models/usersModel";
import { encrypt } from "../utils/handlePassword";
import { describe, beforeEach, it, expect } from "@jest/globals";

// Función para crear un usuario
const createUser = async (userData: { email: string, password: string, name: string, role: string }) => {
  return userModel.create({
    ...userData,
    password: await encrypt(userData.password),
  });
};

describe("Auth Controller", () => {
  beforeEach(async () => {
    await userModel.destroy({ where: {} }); // Limpia la BD antes de cada test
  });

  // Aquí irán todos los grupos de tests
  describe("Testeo de endpoints", () => {
    it("debería registrar un nuevo usuario exitosamente", async () => {
      const userData = {
        name: "testuser",
        email: "test@test.com",
        password: "password123", 
        role: "user"       
      };

      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe("Usuario creado exitosamente");
      expect(response.body.user.email).toBe(userData.email);
    });

    it("debería rechazar un registro con email duplicado", async () => {
      const userData = {
        name: "testuser",
        email: "test@test.com",
        password: "password123",
        role: "user"
      };

      // Primer registro
      await createUser(userData);

      // Intento de registro duplicado
      const response = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(409);

      expect(response.body.message).toBe("El email ya está registrado");
    });

    it("debería Iniciar sesión", async () => {
      const userData = {
        name: "testuser",
        email: "test@test.com",
        password: "password123", 
        role: "user"       
      };

      // Registro del usuario
      const responseR = await request(app)
        .post("/auth/register")
        .send(userData)
        .expect(201);

      expect(responseR.body.message).toBe("Usuario creado exitosamente");
      expect(responseR.body.user.email).toBe(userData.email);

      // Login del usuario
      const response = await request(app)
        .post("/auth/login")
        .send(userData)
        .expect(200);

      expect(response.body.message).toBe("Inicio de sesión exitoso");
    });

    it("debería rechazar un inicio de sesión con credenciales incorrectas", async () => {
      const userData = {
        name: "testuser",
        email: "test@test.com",
        password: "password123", 
        role: "user"
      };

      // Primero, registra al usuario
      await createUser(userData);

      // Intento de login con credenciales incorrectas
      const incorrectCredentials = { ...userData, password: "wrongpassword" };

      const response = await request(app)
        .post("/auth/login")
        .send(incorrectCredentials)
        .expect(400);

      expect(response.body.message).toBe("Credenciales incorrectas");
    });
  });
});
