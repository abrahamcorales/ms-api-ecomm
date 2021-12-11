import containerFile from '../../containers/CartsFile';
import path from 'path';
const filePath = path.join(__dirname,'..','..', '..', 'data', 'carts2.txt');

class CartsDaoFile extends containerFile {

    constructor(){
        super(filePath)
    }
}

export default CartsDaoFile