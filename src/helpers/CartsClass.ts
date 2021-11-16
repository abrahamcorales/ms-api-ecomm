import ProductsClass from './ProductsClass';
import { Carts, Products } from '../interfaces/Inventory';
import path from 'path';
import fs from 'fs/promises'
const ProductFile = path.join(__dirname,'..', '..', 'data', 'products.txt');


class CartsClass extends ProductsClass {
    
    constructor(file:string) {  
        super(file)
    }

    async getProductsCart(id:number){
            const cart:Carts[] =  await this.FuncJSONparse(this.file)
            let cartId = cart.find(cart => cart.id === id )
            return cartId?.productos;
                
    }

    async addProductsCart(cartId:number,productoId:number){
        const carts:Carts[] =  await this.FuncJSONparse(this.file)
        const Products:Products[] = await this.FuncJSONparse(ProductFile)
        
        //? obtengo el producto y el carrito  por el id
        let getProduct = Products.find(product => product.id === productoId )
        let getCart = carts.find(cart => cart.id === cartId )
        let indexCart = carts.findIndex(cart => cart.id === cartId)
        //? agregar el producto al carrrito
        if (getCart?.productos && getProduct){
            getCart.productos.push(getProduct)
            carts[indexCart] = getCart
            try {
                await fs.writeFile(this.file,JSON.stringify(carts,null,2),{encoding:'utf8'})
                return getCart
            } catch (error) {
                return false
            }
        }
            //? actualizo el carrito en cart.txt
    }
    

    async deleteProductCart(cartId:number,productId:number){
        const carts:Carts[] =  await this.FuncJSONparse(this.file)
        let getCart = carts.find(cart => cart.id === cartId )
        //? get array de los productos con id distintos
        let filterProduct = getCart?.productos?.filter(product => product.id !== productId)
        let indexCart = carts.findIndex(cart => cart.id === cartId)
        if (getCart?.productos) {
             getCart.productos = filterProduct
             carts[indexCart] = getCart
             try {
                await fs.writeFile(this.file,JSON.stringify(carts,null,2),{encoding:'utf8'})
                return getCart
            } catch (error) {
                return false
            } 
         }else{
             return getCart
         }
    }
}

export default CartsClass