import * as dotenv from 'dotenv';
dotenv.config()
    
let ProductsDao:any
let CartsDao:any

switch (process.env.DB_PERS) {
    case 'mongodb':
        const { default: CartsDaoMongo } = await import('./carts/CartsDaoMongo.js')               
        const { default: ProductsDaoMongo } = await import('./products/ProductsDaoMongo.js')
        CartsDao    = CartsDaoMongo
        ProductsDao = ProductsDaoMongo
        break

    case 'file':
        const { default: CartsDaoFile } = await import('./carts/CartsDaoFile.js')               
        const { default: ProductsDaoFile } = await import('./products/ProductsDaoFile.js')
        CartsDao    = CartsDaoFile
        ProductsDao = ProductsDaoFile
    
    case 'firebase':
        const { default: CartsDaoFirebase } = await import('./carts/CartsDaoFile.js')               
        const { default: ProductsDaoFirebase } = await import('./products/ProductsDaoFirebase.js')
        CartsDao    = CartsDaoFirebase
        ProductsDao = ProductsDaoFirebase
    
    default:
        break;
}

export {  CartsDao,ProductsDao }
