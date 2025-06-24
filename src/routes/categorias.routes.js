import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/categorias', async (req, resp) => {
    try {
        const [result] = await pool.query('SELECT * FROM categorias')
        console.log(result);

        resp.send(result)

    } catch (error) {
        console.log(error);

    }
})

router.post('/categorias', async (req, res) => {
    const { nombre, imagen } = req.body;
    try {
        const { nombre, imagen } =
            req.body;
        const [result] = await pool.query(
            "insert into categorias (nombre, imagen) values (?,?)",
            [nombre, imagen]
        );
        res.json({
            message: "categoria creada con exito",
        });
    } catch (error) {
        console.log("error al crear", error);
        res.status(500).send("Error al crear un categoria");
    }
});
router.patch('/categorias/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, imagen } = req.body

        await pool.query('update categorias set nombre = ?,imagen=? where id = ?', [nombre, imagen, id])
        res.json({
            message: 'categoria actualizada con éxito',
        })
    } catch (error) {
        console.log('error al actualizar', error);
        res.status(500).send('Error al actualizar un categoria');
    }
});



export default router