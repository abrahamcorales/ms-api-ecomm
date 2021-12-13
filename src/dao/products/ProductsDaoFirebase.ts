import ContainerFirebase from "../../containers/containerFirebase.js";

class ProductsDaoFirebase extends ContainerFirebase{

    constructor(){
        super('productos')
    }
}

export default ProductsDaoFirebase