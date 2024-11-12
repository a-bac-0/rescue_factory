import { Sequelize } from 'sequelize';

import { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, NODE_ENV, TEST_DB_DATABASE } from '../config';

// Definir el nombre de la base de datos dependiendo del entorno
const DB_NAME = NODE_ENV === 'test' ? TEST_DB_DATABASE : DB_DATABASE;

// Crear la conexión a Sequelize
const connection_db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT,
});

// Autenticación y manejo de errores de la base de datos
(async () => {
  try {
    await connection_db.authenticate();
    console.log('Conexión exitosa a la base de datos:', DB_DATABASE);
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();

export default connection_db;