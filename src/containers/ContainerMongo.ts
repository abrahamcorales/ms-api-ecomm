//import CartModel from './models/mongo/Cartschema'
import mongoose from 'mongoose'
import config from '../config'
import * as dotenv from 'dotenv';
dotenv.config()
const productofake = {

    "title": "alexa1",
    "price": 4444,
    "thumbnail": "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
    "descripcion": "large size",
    "codigo": "sksifk3304",
    "id": 1,
    "timestamp": "13/11/2021 20:25:10"
}

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
    
    async getProductsCart(id:string):Promise<boolean | object | null >{
 
        try {
            let result = await this.collection.findById(id).select('productos')
            return result
        } catch (error) {
            return true
        }
    }
//
    async addProductsCart(id:string,producto:number):Promise<boolean | object | null >{ 
        try {
            await this.collection.updateOne({_id: id}, {$push: {productos: productofake }})
            return true
        } catch (error) {
            return false
        }
    }
}


export default ContainerMongo