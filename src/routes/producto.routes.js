import { Router } from "express";
import pool from "../database.js";

const router = Router();


//metodo que seutiliza para definir una requestAnimationFrame, para responder una solicitud http
router.get('/producto/:id', async(req,resp)=>{
    //manejos de errores
    try {
        const {id}= req.params
        const[result] = await pool.query(`SELECT * FROM producto where categoria_id=${id}`)
        resp.send(result)

    } catch (error) {
        console.log(error);

    }
})

router.get('/producto', async(req,resp)=>{
    try {
        const[result] = await pool.query('SELECT * FROM producto');
        resp.send(result);
    } catch (error) {
        console.log(error);
    }
})

  //eliminar productos
router.delete('/producto/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('delete from producto where id= ?',[id])
        res.json({
            message: 'producto eliminado con éxito',
            data: {id}
        })
    } catch (error) {
        console.log('error al eliminar',error);
        res.status(500).send('Error al eliminar el producto');
    }
});

   // actualizar productos
   router.patch('/producto/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {descripcion ,precio} = req.body
        console.log(descripcion,'descripcion');

        await pool.query('update producto set descripcion = ?,precio=? where id = ?', [descripcion,precio,id])
        res.json({
            message: 'producto actualizado con éxito',
        })
    } catch (error) {
        console.log('error al actualizar',error);
        res.status(500).send('Error al actualizar un producto');
    }
});
//crear productos
router.post("/producto", async (req, res) => {
    try {
      const { descripcion, fecha_caducidad, categorias_id, imagen, precio } =
        req.body;
      const [result] = await pool.query(
        "insert into producto (descripcion,fecha_caducidad,categoria_id,imagen,precio) values (?,?,?,?,?)",
        [descripcion, fecha_caducidad, categorias_id, imagen, precio]
      );
      res.json({
        message: "producto creado con exito",
      });
    } catch (error) {
      console.log("error al crear", error);
      res.status(500).send("Error al crear un producto");
    }
  });

export default router
