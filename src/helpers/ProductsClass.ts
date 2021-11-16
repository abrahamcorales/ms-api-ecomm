import fs from 'fs/promises'
import { Products, Carts } from '../interfaces/Inventory';
const timezone = "America/Argentina/Buenos_Aires"

class ProductsClass {

    public file:string

    constructor(file:string) {  
        this.file = file
    
    }
    protected async FuncJSONparse(file:string):Promise<Carts[] & Products[]> {
        try {
        
         let result = await fs.readFile(file, { encoding: 'utf8' });
         return JSON.parse(result);
        
        } catch (error) {
            throw new Error("error en leer el archivo ")
        }
    }
    
    public async getAll() {
        return this.FuncJSONparse(this.file)
      }
      
    async getById(number:number){
        try {
                const products:Products[] = await this.FuncJSONparse(this.file)
                /* find product's id */
                let getPproduct = products.find(p => p.id === number );
                return getPproduct

        } catch (error) {throw error }
    }

    async save(obj:any = {}):Promise<any[]>{
        let date = new Date().toLocaleString('es-US',{timeZone:timezone,hour12:false})
        //? add timestamp
        obj.timestamp = date
        //? get list from txt file 
        let getList = await this.FuncJSONparse(this.file)
        //? agregar obj al array 
        getList.push(obj)
        
        //? obtener el ultimo objeto del array 
        let LastObj = getList[ getList.length - 2 ]
        //? si el ultimo objeto existe sumale 1 al id de ese objeto sino asigna al obj el id 1
        LastObj ? obj.id = (LastObj.id || 0 ) + 1 : obj.id = 1;

        try {
             await fs.writeFile(this.file,JSON.stringify(getList,null,2),{encoding:'utf8'})
             return [true,obj]
        } 
        catch (error) {
            return [false,{}] }
    }

    async deleteById(number:number){
        try {
                const result = await fs.readFile(this.file,{encoding:'utf8'})
                const products:Products[] = JSON.parse(result)
                /* find product's id */
                const listFiltered = products.filter(p => p.id !== number );
                await fs.writeFile(this.file,JSON.stringify(listFiltered,null,2),{encoding:'utf8'})
                return true 
        } catch (error) {throw error }
    }

    async editById(number:number,product:Products){
        try {
            const result = await fs.readFile(this.file,{encoding:'utf8'})
            const products:Products[] = JSON.parse(result)
            const index = products.findIndex(p => p.id === number)
            product.id = number
            products[index] = product
            await fs.writeFile(this.file,JSON.stringify(products,null,2),{encoding:'utf8'})
            return true
        } catch (error) {
            
        }
    }

}

export default ProductsClass