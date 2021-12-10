import CartModel from './models/mongo/Cartschema'
import config from '../config'

const productofake = {

    "title": "alexa1",
    "price": 4444,
    "thumbnail": "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
    "descripcion": "large size",
    "codigo": "sksifk3304",
    "id": 1,
    "timestamp": "13/11/2021 20:25:10"
}

class ContainerMongo {
    
    constructor(){
    }

    async save():Promise<boolean>{
        let cart = new CartModel({
        })   
        try {
            await cart.save() 
            return true
        } catch (error) {
            return true
        }
 
    }
    
    async getProductsCart(id:string):Promise<boolean | object | null >{
 
        try {
            let result = await CartModel.findById(id)
                .select('productos')
            return result
        } catch (error) {
            return true
        }
    }

    async addProductsCart(id:string,producto:number):Promise<boolean | object | null >{ 
        try {
            let result = await CartModel.updateOne({_id: id}, {$push: {productos: productofake }})
            return true
        } catch (error) {
            return false
        }
    }
}


export default ContainerMongo