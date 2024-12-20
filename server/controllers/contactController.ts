import { Request, Response } from "express";
import contactMessageModel from "../models/contactModel";

// Obtener todos los mensajes de contacto
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await contactMessageModel.findAll(); // Obtiene todos los mensajes de contacto de la base de datos
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving contact messages" });
  }
};

// Obtener un mensaje de contacto por ID
export const getContactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtiene el ID desde los parámetros de la URL
    const contact = await contactMessageModel.findByPk(id); // Busca el mensaje de contacto en la base de datos por ID

    if (contact) { // Si el mensaje de contacto se encuentra, lo devuelve en formato JSON
      res.json(contact);
    } else {
      res.status(404).json({ error: "Contact message not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the contact message" });
  }
};

// Eliminar un mensaje de contacto
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtiene el ID desde los parámetros de la URL
    const contact = await contactMessageModel.findByPk(id); // Busca el mensaje de contacto en la base de datos por ID

    if (contact) {
      await contact.destroy(); // Si existe, elimina el mensaje de contacto
      res.json({ message: "Contact message successfully deleted" });
    } else {
      res.status(404).json({ error: "Contact message not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting the contact message" });
  }
};

// Crear un nuevo mensaje de contacto
export const createContact = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, message } = req.body; // Extrae los campos del cuerpo de la solicitud

    const contact = await contactMessageModel.create({
      first_name,
      last_name,
      email,
      message
    }); // Crea un nuevo mensaje de contacto en la base de datos

    res.json(contact); // Envía la respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error creating the contact message" });
  }
};

// Actualizar un mensaje de contacto
export const updateContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtiene el ID desde los parámetros de la URL
    const { first_name, last_name, email, message } = req.body;

    const contact = await contactMessageModel.findByPk(id); // Busca el mensaje de contacto en la base de datos por ID

    if (contact) {
      await contact.update({
        first_name,
        last_name,
        email,
        message
      }); // Actualiza los campos del mensaje de contacto
      res.json(contact);
    } else {
      res.status(404).json({ error: "Contact message not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating the contact message" });
  }
};
