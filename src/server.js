import express from "express";
// server.js
import categorias from './routes/categorias.routes.js';
import producto from './routes/producto.routes.js';
import cors from "cors";


//Intialization
const app = express();
app.use(express.json());



// mecanismo de seguridad permite que un servidor indique cualquier otro
app.use(cors({ origin: 'http://localhost:5173' }));

//Settings
app.set('port', process.env.PORT || 3000)
app.use(categorias)
app.use(producto)
//Run server
app.listen(app.get('port'), () => {
    console.log('conexion con exito');
})

