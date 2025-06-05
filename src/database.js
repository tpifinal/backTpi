import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();
//las variables de entorno estan en el .env, para no publicar nuestras credenciales
const pool = createPool({
    host:'localhost',
    port: process.env.PORTDB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

export default  pool;