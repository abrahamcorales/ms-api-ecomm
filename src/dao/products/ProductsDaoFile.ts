import ProductsFile from '../../containers/ProductsFile';
import config from '../../config'
import path from 'path';
const filePath = path.join(__dirname,'..','..', '..', config.file.path, 'products.txt');

class ProductsDaoFile extends ProductsFile {

    constructor(){
        super(filePath)
    }
}

export default ProductsDaoFile