import * as dotenv from 'dotenv';
import CartsDaoMongo from  './carts/CartsDaoMongo'
import CartsDaoFile from './carts/CartsDaoFile';

dotenv.config()
    
let ProductsDao
let CartsDao:any
    
switch (process.env.DB_PERS) {
    case 'mongodb':
        

        CartsDao = CartsDaoMongo
        break
    case 'file':
        CartsDao = CartsDaoFile
    default:
        break;
}


export {  CartsDao }
