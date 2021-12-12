//import CartModel from './models/mongo/Cartschema'
import mongoose from 'mongoose'
import config from '../config'
import * as dotenv from 'dotenv';
dotenv.config()


mongoose.connect(config.mongodb.string,
                {dbName:config.mongodb.db})
                .then(() => console.log('conexion exitosa'))
                .catch((error) => console.log(error))
class ContainerMongo {

    public collection:any
    public Schema:any
    
    constructor(collectionName:string,schemaObj:any){
        this.Schema = new mongoose.Schema(schemaObj)
        this.collection = mongoose.model(collectionName,this.Schema) 
    }

    async save(obj:object = {}):Promise<boolean>{  
        try {
            await this.collection.create(obj)
            return true
        } catch (error) {
            console.log(error);
            
            return false
        }
 
    }
    
    async getProductsCart(cartId:string):Promise<boolean | object | null >{
 
        try {
            let result = await this.collection.findById(cartId).select('productos')
            return result
        } catch (error) {
            return true
        }
    }
//
    async addProductsCart(cartId:string,productoId:string):Promise<boolean | object | null >{ 
        let producto:Object = {} //= hacerunfind.productoId
        try {
            await this.collection.updateOne({_id: cartId}, {$push: {productos: producto }})            
            return true
        } catch (error) {
            return false
        }
    }
    async deleteProductCart(cartId:string,productId:string){

        try {
            let cart = await  this.collection.findById(cartId)
            let filterProduct = cart?.productos?.filter(producto => producto.id !== 1)
            this.collection.updateOne({_id: cartId},{productos:filterProduct})           
            return true
        } catch (error) {
            console.log(error);
            
            return false
        }

    }
    async deleteById(cartId:string){

        try {
            await this.collection.deleteOne({_id: cartId})       
            return true
        } catch (error) {
            console.log(error);
            
            return false
        }
    }

    async getAll() {
        return await this.collection.find()
      } 
      
    async getById(id:string) {
        return await this.collection.findById(id)
      } 

    async editById(id:string,producto:string) {

     let result = await this.collection.replaceOne({_id: id},producto)
     console.log(result);
      
     return await this.collection.findById(id)
    } 
}


export default ContainerMongo