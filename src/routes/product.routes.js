const {Router} = require('express');

const {productManagerMD} = require('../daos/fileMongo/product.manager.js');

const producService = new productManagerMD();

const router = Router();

router.get('/', async(req,res)=>{
    try {
        const getProducts = await producService.getAll();
        res.status(200).send({result:'success', listProducts:getProducts})
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req,res)=>{
    const productBody = req.body;
    try {
        const create = await producService.save(productBody);
        res.status(200).send({result:'success', productCreated: create});
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req,res)=>{
    const productId = req.params.id;
    const update = req.body;
    try {
        const updateProduct = await producService.updateById(update,productId);
        res.status(200).send({result:'success', upDate:updateProduct});
    
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async(req,res)=>{
    const productId = req.params.id;
    try {
        const deleteP = await producService.deleteById(productId);
        res.status(200).send({result:'succes', productDelete: deleteP});
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
