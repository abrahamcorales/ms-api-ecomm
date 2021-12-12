import ContainerMongo from '../../containers/ContainerMongo';

class ProductsDaoMongo extends ContainerMongo {

    constructor(){
        super('productos',{
            title: { type:String, require: true},
            price: { type:Number, require: true},
            thumbnail: { type:String},
            descripcion: { type:String},
            codigo:{ type:String, require: true},
            stock: { type:Number }
        })
    }
}

export default ProductsDaoMongo