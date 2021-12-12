import ProductsFile from '../../containers/ProductsFile';
import path from 'path';
const filePath = path.join(__dirname,'..','..', '..', 'data', 'products.txt');

class ProductsDaoFile extends ProductsFile {

    constructor(){
        super(filePath)
    }
}

export default ProductsDaoFile