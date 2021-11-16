
export const Auth = (req:any, res:any ,next:any) => {
        
    let response = {
        'error':'-1',
        'descripcion':`ruta ${req.originalUrl} y method ${req.method} no autorizado`
    }

    req.query.admin === 'true' ? next() : res.status(400).send(response)
}