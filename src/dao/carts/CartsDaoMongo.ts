import ContainerMongo from '../../containers/ContainerMongo';

class  CartsDaoMongo extends ContainerMongo {

    constructor(){
        super('cart',{
            productos: { type: [], required: true },
            create_date: { type: Date, default: Date.now }
            })
    }
}

export default CartsDaoMongo