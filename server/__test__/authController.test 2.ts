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
    it("should register a new user successfully", async () => {
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

      expect(response.body.message).toBe("User created successfully");
      expect(response.body.user.email).toBe(userData.email);
    });

    it("should reject a registration with a duplicate email", async () => {
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

      expect(response.body.message).toBe("Email is already registered");
    });

    it("should log in successfully", async () => {
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

      expect(responseR.body.message).toBe("User created successfully");
      expect(responseR.body.user.email).toBe(userData.email);

      // Login del usuario
      const response = await request(app)
        .post("/auth/login")
        .send(userData)
        .expect(200);

      expect(response.body.message).toBe("Login successful");
    });

    it("should reject login with incorrect credentials", async () => {
      const userData = {
        name: "testuser",
        email: "test@test.com",
        password: "password123", 
        role: "user"
      };

      // Primero, registra al usuario
      await createUser(userData);

      // Intento de login con credenciales incorrectas
      const incorrectCredentials = { ...userData, password: "Incorrect credentials" };

      const response = await request(app)
        .post("/auth/login")
        .send(incorrectCredentials)
        .expect(400);

      expect(response.body.message).toBe("Incorrect credentials");
    });
  });
});
