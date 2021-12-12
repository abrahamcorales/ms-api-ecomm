import {ProductsDao} from '../dao/index';
import { Products } from '../interfaces/Inventory';
import { Auth } from '../middleware/Auth'

const db = new ProductsDao

export const save = async (req:any,res:any) => {
        let producto:Products = req.body
        try {

            await db.save(producto)
            res.send(({ 'status': 'added' }))
        } catch (error) {
            res.status(400).send({'status':'error'})
        }         
}
export const getAll = async(req:any,res:any)=>{
    
    let result = await db.getAll()    
    result && res.send(result) 
    ||
    res.status(400).send({ 'status': 'error' });

}

export const getById = async(req:any,res:any)=>{
    let id:string = req.params.id
    let result = await db.getById(id)    
    result && res.send(result) 
    ||
    res.status(400).send({ 'status': 'error' });

}

export const deleteById = async(req:any,res:any)=>{
    let id:string = req.params.id
    const result = await db.deleteById(id)
    
    result && res.send(result)
    ||
    res.status(400).send({'status':'error'})

}

export const editById = async(req:any,res:any)=>{
    let id:string = req.params.id
    let producto:Products = req.body
    const result = await db.editById(id,producto)
    
    result && res.send(result)
    ||
    res.status(400).send({'status':'error'})

}