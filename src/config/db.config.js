const mongoose = require('mongoose');
const {options} = require('./options');

const url = options.mongoDb.url;

mongoose.set('strictQuery', false);

mongoose.connect(url,( error)=>{
    if(error){
        console.log('Error al conectarse a MD')
    }else{
        console.log('conexion extiosa a MD');
    }
});