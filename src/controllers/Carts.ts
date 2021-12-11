import ContainerMongo from '../containers/ContainerMongo';
import {CartsDao} from '../dao/index';

const db = new CartsDao

//const db = new ContainerMongo('cart',{
//    productos: { type: [], required: true },
//    create_date: { type: Date, default: Date.now }
//    })


export const save = async (req:any,res:any) => {

        try {

            await db.save()
            res.send(({ 'status': 'added' }))
        } catch (error) {
            res.status(400).send({'status':'error'})
        }         
}

export const  getProductsCart = async(req:any,res:any) => {
    let id:string = req.params.id

    try {
        let result = await db.getProductsCart(id)
        res.send(result)
    } catch (error) {
        res.status(400).send({'status':'error'})
    }          
}
//
export const addProductsCart = async (req:any,res:any)=>{
    let cartId:string = req.params.id
    let productId:number = req.body.id
    if (productId) {
        let result = await db.addProductsCart(cartId,productId)
        result ? res.send({ 'status': 'added' }) : res.status(400).send({'status':'error'})
         
    }else{
        res.send({'status':'error, neceistas enviar la key \'id\' con el numbero del producto en el body'})
    }  
}
//