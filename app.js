//1. Requerir librerías y drivers
const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const MongoDBUrl = require('./keys');
const Controller = require('./controllers/admin');

//2. Configurar web server y parsear los datos
const app = express();
const port = 1000;
app.use(bodyParser.json());

//3. definir paths disponibles

app.get('/',(req,res) => {
    res.send('Servidor activo... Por favor use /api/customers');
    console.log('Request a raiz del server de apis...');
});
app.get('/api/autorizaciones', Controller.bcInq);
app.post('/api/altas', Controller.bcAdd);

//4. Encender web server

app.listen(port,() => {
    console.log('Server inicializado en el puerto: ' + port);
    mongoose.connect(MongoDBUrl.conn,{useNewUrlParser:true, useUnifiedTopology:true}).then(() => {
        console.log('Server mongoDB conectado...'), err => {console.log(err)}
    })
});