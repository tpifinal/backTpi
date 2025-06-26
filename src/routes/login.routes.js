import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../database.js";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = 'tu_clave_secreta_segura';

router.post("/login" , async(req, res) => {
    try{
        const {email, password,} =req.body;
     //buscar el usuario por email
      const[result] = await pool.query ("select * FROM usuarios where email = ?",[email])
        if (result.length === 0 ) {
            res.status(401).json("usuario inexistente")
        }

        //verificando contraseña
        const passwordValidated= await bcrypt.compare(password,result[0].password)
        if (!passwordValidated) {
             res.status(401).json("contraseña invalida")
        }

         // Generar token
    const token = jwt.sign(
      {
        id: result[0].id,
        nombre: result[0].nombre,
        email: result[0].email,
        rol_id: result[0].rol_id,
      },
      JWT_SECRET,
      { expiresIn:'1h'}
    );

        return res.json({Mensaje:"login exitoso",token})
    }
    catch (error) {
        console.log("error ", error);
        res.status(500).send("error verificar credenciales")
     }
});

export default router
