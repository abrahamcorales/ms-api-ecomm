import {Schema, model, connect } from 'mongoose';
import { Carts } from '../../../interfaces/Inventory';
import * as dotenv from 'dotenv';
dotenv.config()

const string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`
    
connect(
        `${string}`,
        {dbName: 'ecomm'}
        )
        .then((data) => console.log('conexion exitosa'))
        .catch((error) => console.log(error)
        )


    const cartSchema = new Schema<Carts>({
        productos: { type: [], required: true },
        create_date: { type: Date, default: Date.now }
        
        })
const cartModel = model('cart',cartSchema)

export default cartModel