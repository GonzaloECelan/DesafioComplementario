const express = require('express');


const conexionMD = require('./config/db.config');
const routerProduct = require('./routes/product.routes');
const routerCart = require('./routes/cart.routes');
const {options} = require('./config/options');

const {ProductManagerFs} = require('./daos/fileManager/product.managerFs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + 'public'));

const port = 8080;

const server = app.listen(port, ()=>{
    console.log('el servidor se levanto en el puerto 8080');

})

server.on('error', error=> console.log(error))

app.use('/api/product',routerProduct);
app.use('/api/cart',routerCart);


const productService = new ProductManagerFs(options.FileSystem.productFileName);

app.get('/fs/product', async (req,res)=>{
    try {
        const products = await productService.getAll()
        res.send(products);
    } catch (error) {
        console.log(error)
        res.send('no existe archivo');
    }
})