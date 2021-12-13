//import CartModel from './models/mongo/Cartschema'
import mongoose from 'mongoose'
import config from '../config.js'
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
        let ObjectId = mongoose.Types.ObjectId
        let dbExt = mongoose.connection
        let test = dbExt.collection('productos')
        let Producto = await test.findOne({'_id':new ObjectId(productoId)}) 

        try {
            await this.collection.updateOne({_id: cartId}, {$push: {productos: Producto }})            
            return true
        } catch (error) {
            return false
        }
    }
    async deleteProductCart(cartId:string,productId:string){

        try {
            let cart = await  this.collection.findById(cartId)
            let filterProduct = cart?.productos?.filter(producto => producto.id !== productId)
            this.collection.updateOne({_id: cartId},{productos:filterProduct})           
            return true
        } catch (error) {
            console.log(error);
            
            return false
        }

    }
    async deleteById(id:string){

        try {
            await this.collection.deleteOne({_id: id})       
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

    async editById(id:string,producto:object) {
        
        try{
             await this.collection.replaceOne({_id: id},producto)
            return true
        } catch (error) {
            console.log(error);

            return false
        }
    } 
}


export default ContainerMongo