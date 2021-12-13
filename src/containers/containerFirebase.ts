import admin, { database } from 'firebase-admin'
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase.credetentialFile),
    databaseURL: config.firebase.databaseURL
})

const db = admin.firestore()
class ContainerFirebase {

    public collection:any

    constructor(collectionName:string){
        this.collection = db.collection(collectionName)
    }

    async save(obj:object = {}):Promise<boolean>{  
        try {
            await this.collection.doc().create(obj)
            return true
        } catch (error) {
            console.log(error);
            
            return false
        }
    }

    async getById(id:string) {
        return await this.collection.doc(id).get()
      }

    async getAll() {
        let result = await this.collection.get()
        return result.docs.map(doc => doc.data());
    } 
    async deleteById(id:string){

        try {
            await this.collection.doc(id).delete();       
            return true
        } catch (error) {
            console.log(error);
            
            return false
        }
    }
    async editById(id:string,producto:object) {

        try {
            await this.collection.doc(id).set(producto);
            return true
        } catch (error) {
            console.log(error);
            return false
            
        }
       }
    async getProductsCart(cartId:string):Promise<boolean | object | null >{
 
        try {
            let result = await this.collection.doc(cartId).get()
            return result._fieldsProto.productos.arrayValue

        } catch (error) {
            return false
        }
    } 
    async addProductsCart(cartId:string,productoId:string):Promise<boolean | object | null >{ 
        let prCollection = db.collection('productos')
        let producto = await prCollection.doc(productoId).get()        
        try {
            this.collection.doc(cartId).update({
                productos: admin.firestore.FieldValue.arrayUnion(producto.data())
            });           
            return true
        } catch (error) {
            return false
        }
    }

    async deleteProductCart(cartId:string,productId:string){

        try {
            let cart = await  this.collection.doc(cartId).get()
            let cartFix = cart.data();
            
            let filterProduct = cartFix?.productos?.filter(producto => producto.id !== productId)
            
            this.collection.doc(cartId).update(
                {productos: filterProduct});            
            return true
        } catch (error) {
            console.log(error);
            
            return false
        }

    }
}

export default ContainerFirebase