const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config.db')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuarios = '/api/usuarios'
        this.authPath = '/api/auth'

        // Conexión a la data base
        this.conectarDB()

        // Middlewares
        this.middlewares()
        
        // Rutas de mi apliación
        this.routes()
    }

    async conectarDB () {
        await dbConnection()
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
        this.app.use(this.authPath, require('../routes/auth.routes'))
        this.app.use(this.usuarios, require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        })
    }
}

module.exports = Server