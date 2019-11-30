db.createUser({
    user:"apiuser",
    pwd:"apipassword",
    roles:[
        {
            role:"readWrite",
            db: "bc"
        }
    ]
});
//heredar acceso de lectura escritura
db.grantRolesToUser("apiuser", [ "readWrite" ] );
//habilitar uso desde shell y cadena de conexion
db.auth('apiuser', 'apipassword');
//crea la bd
db = db.getSiblingDB('bc');
//crear coleccion y fijar creacion de bd
db.bc.insertMany([
    {odnumpe:3142,odaubur:true,odaucom:false},
    {odnumpe:1242,odaubur:true,odaucom:false},
    {odnumpe:5125,odaubur:false,odaucom:false},
    {odnumpe:2155,odaubur:true,odaucom:true},
    {odnumpe:8454,odaubur:false,odaucom:true}

]);