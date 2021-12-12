import ContainerFirebase from "../../containers/containerFirebase";

class ProductsDaoFirebase extends ContainerFirebase{

    constructor(){
        super('productos')
    }
}

export default ProductsDaoFirebase