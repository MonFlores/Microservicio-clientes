# Contenedor Express-Mongodb-Authentication

_Implementación con Node Js, Express, MVC, con acceso authenticado_

### Pre-requisitos 📋

_Que cosas necesitarás_

```
Framework Node Js

Docker
Editor de código (WebStorm en este caso)
Git
Postman
Cuenta en GitHub
MongoDB
```
### Crear estructura del proyecto

_Estructura general inicial_

```
apiclientes
    controllers
      admin.js
    models
      customer.js
    app.js
    keys.js

```

_cadena de conexion,considerando el usuario y password_

```javascript
const DbConnection='mongodb://apiuser:apipassword@mongoserver:27017/bc';
```
_API get_

```javascript
app.get('/api/autorizaciones', Controller.bcInq);
```
_API post_
app.post('/api/altas', Controller.bcAdd);

```javascript
app.post('/api/altas', Controller.bcAdd);
```

_En el controller el archivo admin.js, estarán las funciones_

```javascript
exports.bcInq = function (req, res) {
    BC.find({},{_id:0,odnumpe:1,odaubur:1,odaucom:1},function (err, doc) {
        if (err) return console.log(err);
        console.log("Clientes encontrados...");
        console.log(doc);
        res.send(doc);
    }).sort({odnumpe:1});
};
exports.bcAdd = (req, res) => {
    Buro = new  BC({
        odnumpe: req.body.odnumpe,
        odaubur: req.body.odaubur,
        odaucom: req.body.odaucom
    });
    console.log(Buro);
    Buro.save(function (err, Buro) {
        if (err) return console.error(err);
        // console.log(tour.tourName + " insertado en la coleccion tours...");
        res.send(Buro.odnumpe + " insertado en la coleccion ...");
    });
}
```

### Crear el archivo de inicio de la bd

_Estructura mongo-init.js_

```javascript
//crear el usuario de servicio
db.createUser({
    user:"apiuser",
    pwd:"apipassword",
    roles:[
        {
            role:"readWrite",
            db:"bc"
        }
        
    ]
});
//heredar acceso de lectura escritura
db.grantRolesToUser( "apiuser", [ "readWrite" ] );
//habilitar uso desde shell y cadena de conexion
db.auth('apiuser', 'apipassword');
//crear la bd
db = db.getSiblingDB('bc');
//crear colleccion y fijar creacion de bd
db.bc.insertMany([
    {odnumpe:3142,odaubur:true,odaucom:false},
    {odnumpe:1242,odaubur:true,odaucom:false},
    {odnumpe:5125,odaubur:false,odaucom:false},
    {odnumpe:2155,odaubur:true,odaucom:true},
    {odnumpe:8454,odaubur:false,odaucom:true}
]);
```

_Resumen de creación_

> * Crear el código de controller
> * Crear el código del api e invocar el controller
> * Instalar las librerías eje. npm install express body-parser
> * Hacer el npm init para documentar el servicio
> * Editar el package.json en la línea script: "start":"node app.js"
> * Crear el archivo mongo-init.js para usuarios y carga de datos inicial
> * Crear el archivo docker-compose.yml con las instrucciones de armado


_Crear Dockerfile_

```Dockerfile
FROM  node:9-slim
RUN mkdir /src
WORKDIR /src
COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 1000
CMD ["npm","start"]
```

_Crear .dockerignore para no considerar la carpeta librerías (drivers)_

```
node_modules
```

### Orquestar los servicios 🔩

_Una vez creadas las imagenes con los servicios validados, los vamos a orquestar_

_Resumen_

> * Crear el docker-compose.yml, instrucciones de armado de los contenedores
> * Corer el docker-compose.yml
> * Validar la existencia de los contenedores
> * Validar los logs de cada contenedor si están encendidos
> * Revisar los logs después de cada operación de los contenedores involucrados

_Crear docker-compose.yml al nivel del proyecto_

```
apiclientes
    controllers
      admin.js
    models
      customer.js
    app.js
    keys.js
    mongo-init.js
    package.json
    Dockerfile
    .dockerignore
    docker-compose.yml
```

```yml
version: '3'

#Declarar los servicios
#depends_on para ligar conexion entre contenedores
#environment instrucciones para el uso de bd, usuario y pass
# adicionalamente para cargar archivo de inicializacion mongo-init.js
# en settings de docker en la pestaña share drives debe estar habilitado el drive
# de no hacerlo marca error de drive no compartido
services:
  catclientes:
    container_name: apiclientes
    image: api_clientes
    build: .
    ports:
      - '1000:1000'
    networks:
      - domain.parties
    depends_on:
      - database
  database:
      container_name: mongoserver
      image: mongo
      environment:
         - MONGO_INITDB_DATABASE=bc
         - MONGO_INITDB_ROOT_USERNAME=apiuser
         - MONGO_INITDB_ROOT_PASSWORD=apipassword
      volumes:
         - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
      ports:
         - '27017:27017'
      networks:
         - domain.parties
networks:
   domain.parties:
     external: true
```
_Crear la red domain.parties antes correr el compose_

```Dockerfile
docker network create domain.parties
```

_Crear los contenedores al correo yml_

```Dockerfile
docker-compose up -d
```

_Validar la creación_

```Dockerfile
docker ps
```

## Referencias utiles para el diseño de Microservicios 🛠️

_Microservicios es mas que contenedores, debes considerar domain drive design_

* [Arcitura](https://patterns.arcitura.com/soa-patterns/design_patterns/overview) - Patrones de arquitectura
* [Swagger](http://petstore.swagger.io/) - Swagger
* [API](https://apievangelist.com) - Artículos de API
* [Patrones](http://apistylebook.com/) - Guias de diseño de API
* [SOA](https://publications.opengroup.org/white-papers/soa) - Open group de SOA
* [Microservicios](https://martinfowler.com/articles/microservices.html) - Microservicios Martin Fowler
* [IFX](https://bms.ifxforum.org/rel2_4/content/contents.jsp) -  IFX standard
* [BIAN](https://bian.org/servicelandscape/) -  BIAN Lansdcape
* [DDD](https://martinfowler.com/tags/domain%20driven%20design.html) -  Domain Drive Design Martin Fowler


## Autor ✒️

* **Fernanda Flores** - *Versión Inicial* - [MonFlores](https://github.com/MonFlores/)



