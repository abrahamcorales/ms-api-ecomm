import {CartsDao} from '../dao/index.js';

const db = new CartsDao
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
    let productId:string = req.body.id
    
    if (productId) {
        let result = await db.addProductsCart(cartId,productId)
        console.log(result);
        
        result ? res.send({ 'status': 'added' }) : res.status(400).send({'status':'error'})
         
    }else{
        res.send({'status':'error, neceistas enviar la key \'id\' con el numbero del producto en el body'})
    }  
}
export const deleteProductCart = async(req:any,res:any)=>{
    let cartId:string = req.params.id
    let idProduct:string = req.params.id_prod
    const result = await db.deleteProductCart(cartId,idProduct)
    
    result && res.send(result)
    ||
    res.status(400).send({'status':'error'})

}

export const deleteById = async(req:any,res:any)=>{
    let id:string = req.params.id
    const result = await db.deleteById(id)
    
    result && res.send(result)
    ||
    res.status(400).send({'status':'error'})

}

