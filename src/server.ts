import express from 'express';
const app = express()
const port = process.env.PORT || 8080;
import RouteProduct from './routes/Products'
import RouteCarts from './routes/Carts'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/productos',RouteProduct)
app.use('/api/carrito',RouteCarts)

app.use((req, res) => {
          res.send({
            error: {
              'error':'-2',
              'descripcion':`ruta ${req.originalUrl} método ${req.method} no implementada`,
            },
          });
    });

app.listen(port,()=>{
    console.log('server running 2');
    
})
