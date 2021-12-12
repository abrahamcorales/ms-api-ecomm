import containerFile from '../../containers/CartsFile';
import config from '../../config'
import path from 'path';
const filePath = path.join(__dirname,'..','..', '..', config.file.path, 'carts.txt');

class CartsDaoFile extends containerFile {

    constructor(){
        super(filePath)
    }
}

export default CartsDaoFile