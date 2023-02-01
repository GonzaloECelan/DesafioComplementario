const productModel = require('../../models/product.schema.js');

class productManagerMD {


    async getAll(){
       
        try {
            const getProduct = await productModel.find()
        return getProduct
        } catch (error) {
            throw new Error(`Couldn't read file ${error}`)
        }
    }
    async save(obj) {
        try {
            const productCreated = await productModel.create(obj);
            return productCreated;
        } catch (error) {
            throw new Error(`Error saving: ${error}`);
        }
    }
    async updateById(info, id) {
        try {
            const productUpdated = await productModel.findByIdAndUpdate(id, info,{new:true});
            return productUpdated;
        } catch (error) {
            throw new Error(`Error updating ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const deleteProduct = await productModel.findByIdAndDelete(id);
            return `deleted successfully`;
        } catch (error) {
            throw new Error(`Error deleting: ${error}`);
        }
    }

    async deleteAll() {
        try {
            await productModel.deleteMany({});
            return "delete all successfully";
        } catch (error) {
            throw new Error(`Error deleting: ${error}`);
        }
    }


}

module.exports = {productManagerMD};