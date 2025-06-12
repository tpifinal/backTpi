import { Router } from "express";
import pool from "../database.js";

const router = Router();

//listar roles 
router.get('/roles', async(req,resp)=>{
    //manejos de errores
    try {
        const[result] = await pool.query(`SELECT * FROM roles `)
        resp.send(result)

    } catch (error) {
        console.log(error);

    }
})

 //crear roles

 router.post("/roles", async (req, res) => {
    try {
      const { nombre } = req.body;
      const [result] = await pool.query(
        "insert into roles (nombre) values (?)",
        [nombre]
      );
      res.json({
        message: "rol creado con exito",
      });
    } catch (error) {
      console.log("error al crear", error);
      res.status(500).send("Error al crear un rol");
    }
  });
export default router