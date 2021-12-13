import express from 'express';
const app = express()
const port = process.env.PORT || 8080;
import RouteProduct from './routes/Products.js'
import cartRoute from './routes/Carts.js'
import morgan from 'morgan'
app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/productos',RouteProduct)
app.use('/api/carrito',cartRoute)

app.get('/api/version',(req,res)=>{
  res.send({'v':'1.0.2'})
})

app.use((req, res) => {
    res.send({
      error: {
        'error':'-2',
        'descripcion':`ruta ${req.originalUrl}  y método ${req.method} no implementado`,
      },
    });
});

app.listen(port,()=>{
    console.log('server running');
    
})
