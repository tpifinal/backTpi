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

  // actualizar rol
router.patch('/roles/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre } = req.body
        console.log(nombre,'nombre');

        await pool.query('update roles set nombre= ? where id = ?', [nombre,id])
        res.json({
            message: 'rol actualizado con éxito',
        })
    } catch (error) {
        console.log('error al actualizar',error);
        res.status(500).send('Error al actualizar un rol');
    }
});
  
  //eliminar rol
router.delete("/roles/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('delete from roles where id= ?',[id])
        res.json({
            message: 'rol eliminado con éxito',
            data: {id}
        })
    } catch (error) {
        console.log('error al eliminar',error);
        res.status(500).send('Error al eliminar el rol');
    }
});
export default router