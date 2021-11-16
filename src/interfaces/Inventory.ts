
export interface Products {
  title: string;
  price: number,
  thumbnail: string
  descripcion:string
  codigo:string
  stock: number
  id?: number
  timestamp?: string
  }

  export interface Carts {
    id?: number
    timestamp?: string
    productos?: Products[]
    }
