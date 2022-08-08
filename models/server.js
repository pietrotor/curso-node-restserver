const express = require('express')
const cors = require('cors')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = 'api/usuarios'

        // Middlewares
        this.middlewares()
        
        // Rutas de mi apliación
        this.routes()
    }

    middlewares() {
        // Cors
        this.app.use(cors())

        // Parseo y lectura del body
        this.app.use(express.json())

        // Directorio Púlico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        })
    }
}

module.exports = Server