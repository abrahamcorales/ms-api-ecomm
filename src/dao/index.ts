import * as dotenv from 'dotenv';
import CartsDaoMongo from  './carts/CartsDaoMongo'
import CartsDaoFile from './carts/CartsDaoFile';
import ProductsDaoMongo from './products/ProductsDaoMongo';
import ProductsDaoFile from './products/ProductsDaoFile';
import ProductsDaoFirebase from './products/ProductsDaoFirebase';
import CartsDaoFirebase from './carts/CartsDaoFirebase';

dotenv.config()
    
let ProductsDao:any
let CartsDao:any
    
switch (process.env.DB_PERS) {
    case 'mongodb':               
        //const { default: ProductsDaoMongo } = await import('./products/ProductsDaoMongo')
        CartsDao    = CartsDaoMongo
        ProductsDao = ProductsDaoMongo
        break

    case 'file':
        CartsDao    = CartsDaoFile
        ProductsDao = ProductsDaoFile
    
    case 'firebase':
        CartsDao    = CartsDaoFirebase
        ProductsDao = ProductsDaoFirebase
    
    default:
        break;
}

export {  CartsDao,ProductsDao }
