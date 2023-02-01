const fs = require('fs/promises');
const { existsSync } = require('fs');


class ProductManagerFs {
    constructor(path){
        this.path = path;
    }

    async getAll() {
        if(existsSync(this.path)){
            try{
                const readFile = await fs.readFile(this.path,'utf8');
                return JSON.parse(readFile);
            }
            catch(error){
                throw new Error(error);
            }
        }
        else{
            throw new Error("No existe archivo");
        }
    }

    async save(prod) {
        try {
            const productsFs = await this.getAll();
            let newId;
            if (productsFs.length === 0) {
                newId = 1;
            } else {
                newId = productsFs[productsFs.length - 1].id + 1;
            }
            const newProduct = { id: newId, ...prod };
            productsFs.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(productsFs, null, 2))
            return newProduct;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getById(id) {
        const productsFs = await this.getAll()
        const index = productsFs.findIndex(element=> element.id == id);
        if (index === -1) {
            throw new Error('Product not found');
        } else {
            const productFound = productsFs[index];
            return productFound;
        }
    }

    async updateById(info, id) {
        const productsFs = await this.getAll()
        const index = productsFs.findIndex(element=> element.id == id)
        if (index == -1) {
            throw new Error('Product not found');
        } else {
            productsFs[index] = { id,...info }
            try {
                await fs.writeFile(this.path, JSON.stringify(productsFs, null, 2))
                return productsFs[index];
            } catch (error) {
                throw new Error(error);
            }
        }
    }

    async deleteById(id) {
        const productsFs = await this.getAll();
        const index = productsFs.findIndex(element=> element.id == id);
        if (index == -1) {
            throw new Error('Product not found');
        }
        const products = productsFs[index];
        productsFs.splice(index, 1)
        try {
            await fs.writeFile(this.path, JSON.stringify(productsFs, null, 2));
            return `Element deleted successfully`;
        } catch (error) {
            throw new Error(error);
        }
    }
}



module.exports = {ProductManagerFs};
