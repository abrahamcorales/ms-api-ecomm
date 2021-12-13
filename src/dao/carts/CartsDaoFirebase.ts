import ContainerFirebase from "../../containers/containerFirebase.js";

class CartsDaoFirebase extends ContainerFirebase{

    constructor(){
        super('cart')
    }
}

export default CartsDaoFirebase