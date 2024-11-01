const mongoose = require('mongoose');

// process.env.MONGO_USER
// process.env.MONGO_PWD
// process.env.MONGO_HOSTNAME
// process.env.MONGO_PORT
// process.env.MONGO_DATABASE

const STRING_LOCAL_CONNECTION = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=domina`

console.log(STRING_LOCAL_CONNECTION)

main().catch(err => console.log('Ocurrió un error en la conexión a la base de datos de mongo :: ', err));

async function main() {
    await mongoose.connect(STRING_LOCAL_CONNECTION);
    console.log('Conexión a mongo exitosa.')
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}