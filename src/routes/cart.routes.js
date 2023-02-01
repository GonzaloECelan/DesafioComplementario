const {Router} = require('express');
const cartModel = require('../models/cart.schema');


const router = Router();

router.post('/', async(req,res)=>{
    const userName = req.body;

    try {
        if(!userName){
            res.send('Please! enter username')
        }else{
            const createCart = await cartModel.create(userName);
            res.status(200).send({result:'Cart created'})
        }
    
    } catch (error) {
        console.log(error)
    }
})

router.post('/add/:id', async (req,res)=>{
    const productId = req.body;
    const cartId = req.params.id;
    try {
        const pushProduct = await cartModel.findByIdAndUpdate({_id:cartId},{$push:{Cart:productId}});
        res.status(200).send({result:'success',addProduct:pushProduct});
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async(req,res)=>{
    const cartId = req.params.id;
    try {
        const findCart = await cartModel.findById(cartId);
        res.status(200).send({result:'success', data:findCart});
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;