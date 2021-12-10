
import { promises } from "fs";
const { readFile, writeFile } = promises;
import { Products, Carts } from '../interfaces/Inventory';
const timezone = "America/Argentina/Buenos_Aires"

class ProductsClass {

    public file:string

    constructor(file:string) {  
        this.file = file
    }

    protected async FuncJSONparse(file:string):Promise<any> {
        try {
        
         let result = await readFile(file, { encoding: 'utf8' });
         return JSON.parse(result);
        
        } catch (error) {
            console.log(error);
            return true
        }
    }
    
    protected async SavetoFile(file:string,result:object):Promise<boolean>{
        
        try {
            await writeFile(file,JSON.stringify(result,null,2),{encoding:'utf8'})
            return true
       } 
       catch (error) {
            console.log(error);
            return false }
        }

    async getAll() {
            return this.FuncJSONparse(this.file)
          }  

    async getById(number:number){

        const products:Products[] = await this.FuncJSONparse(this.file)
        /* find product's id */
        let getPproduct = products.find(p => p.id === number );
        return getPproduct

    }

    async save(obj:any = {}):Promise<any[]>{
        let date = new Date().toLocaleString('es-US',{timeZone:timezone,hour12:false})
         obj.timestamp = date 
        
        let list = await this.FuncJSONparse(this.file)
        list.push(obj) //? agregar obj al array 
        let LastObj = list[ list.length - 2 ] //? obtener el ultimo objeto del array
        
        //? si el ultimo objeto existe sumale 1 al id de ese objeto sino asigna al obj el id 1
        LastObj ? obj.id = (LastObj.id || 0 ) + 1 : obj.id = 1;
        
        let save = await this.SavetoFile(this.file,list)
        return save ? [true,obj] :  [false,{}] 
    }

    async deleteById(number:number){

        let list:Products[] = await this.FuncJSONparse(this.file)
        const listFiltered = list.filter(p => p.id !== number);
        return  await this.SavetoFile(this.file,listFiltered)
        
    }

    async editById(number:number,product:Products){
   
        const result = await readFile(this.file,{encoding:'utf8'})
        const products:Products[] = JSON.parse(result)
        const index = products.findIndex(p => p.id === number)
        product.id = number           
        products[index] = product
        return await this.SavetoFile(this.file,products)
    }

}

export default ProductsClass