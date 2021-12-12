import * as dotenv from 'dotenv';
import CartsDaoMongo from  './carts/CartsDaoMongo'
import CartsDaoFile from './carts/CartsDaoFile';
import ProductsDaoMongo from './products/ProductsDaoMongo';
import ProductsDaoFile from './products/ProductsDaoFile';


dotenv.config()
    
let ProductsDao:any
let CartsDao:any
    
switch (process.env.DB_PERS) {
    case 'mongodb':               
        CartsDao    = CartsDaoMongo
        ProductsDao = ProductsDaoMongo
        break

    case 'file':
        CartsDao    = CartsDaoFile
        ProductsDao = ProductsDaoFile
    default:
        break;
}


export {  CartsDao,ProductsDao }
