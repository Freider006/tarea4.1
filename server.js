const express = require("express")
const cors = require("cors")
const app = express()
const mysql = require("mysql")
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'estudiantesweb',
    password: 'admin12345',
    database: 'cursoweb',
    port: 3306
})
connection.connect(err => {
    if (err) console.log("conexion", err);
    console.log("conectado a mysql")
});

app.use(cors())
app.use(express.json())

app.post('/crear', (req, res) => {
    const { name, last_name, identification, email, phone } = req.body;
    connection.query('INSERT INTO student(name,last_name,identification,email,phone)VALUES(?,?,?,?,?)',
        [name, last_name, identification, email, phone], (err, result) => {
            if (err) console.log('Errores', err)
            res.send("Cliente agregado")
        })
})

app.get('/estudiantes', (req, res) => {
    connection.query('SELECT * FROM student', (err, results) => {
        if (err) {
            console.log('Error al obtener los estudiantes', err);
            res.status(500).send('Error al obtener los estudiantes');
        } else {
            res.json(results);
        }
    });
});

app.put('/actualizarCorreo/:id', (req, res) => {
    const { id } = req.params
    const { email } = req.body;

    connection.query(
        'UPDATE student SET email = ? WHERE id = ?',
        [email, id],
        (err, result) => {
            if (err) {
                console.log('Error al actualizar el correo', err);
                return res.status(500).send('Error al actualizar el correo');
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('Estudiante no encontrado');
            }

            res.send('Correo actualizado con éxito');
        }
    );
});

app.get("/usuario", (req, res) => {  
    const identification = req.body.identification;

    connection.query("SELECT * FROM student WHERE identification = ?", [identification], (err, result) => {  
        if (err) {  
        }  

        if (result.length === 0) {  
        }  

        res.send(result);
    });  
    




});


app.listen(3000, () => {
    console.log("corriendo en el puerto 3000");
})

