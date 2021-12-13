import containerFile from '../../containers/CartsFile.js';
import config from '../../config.js'
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url); //! for use __dirname in ECMAScript modules
const __dirname = path.dirname(__filename); //! for use __dirname in ECMAScript modules
const filePath = path.join(__dirname,'..','..', '..', config.file.path, 'carts.txt');

class CartsDaoFile extends containerFile {

    constructor(){
        super(filePath)
    }
}

export default CartsDaoFile