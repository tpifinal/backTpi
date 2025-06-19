import { Router } from "express";
import pool from "../database.js";

const router = Router();

//listar usuarios 
router.get('/usuarios', async(req,resp)=>{
    //manejos de errores
    try {
        const[result] = await pool.query(`SELECT * FROM usuarios `)
        resp.send(result)

    } catch (error) {
        console.log(error);

    }
})

 //crear usuarios

 router.post("/usuarios", async (req, res) => {
    try {
      const { nombre, email, password, rol_id } = req.body;
      const [result] = await pool.query(
        "insert into usuarios (nombre, email, password, rol_id) values (?,?,?,?)",
        [nombre, email, password, rol_id]
      );
      res.json({
        message: "usuario creado con exito",
      });
    } catch (error) {
      console.log("error al crear", error);
      res.status(500).send("Error al crear un usuario");
    }
  });

  // actualizar usuarios
router.patch('/usuarios/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre,email,password,rol_id } = req.body

        await pool.query('update usuarios set nombre= ? ,email = ? , password =? , rol_id = ? where id = ?', [nombre,email,password,rol_id,id])
        res.json({
            message: 'usuario actualizado con éxito',
        })
    } catch (error) {
        console.log('error al actualizar',error);
        res.status(500).send('Error al actualizar un usuario');
    }
});
  
  //eliminar usuarios
router.delete("/usuarios/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('delete from usuarios where id= ?',[id])
        res.json({
            message: 'usuario eliminado con éxito',
            data: {id}
        })
    } catch (error) {
        console.log('error al eliminar',error);
        res.status(500).send('Error al eliminar el usuario');
    }
});
export default router