import ContainerFirebase from "../../containers/containerFirebase";

class CartsDaoFirebase extends ContainerFirebase{

    constructor(){
        super('cart')
    }
}

export default CartsDaoFirebase