const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const usuario = require('../models/usuario')
const Usuario = require('../models/usuario')

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')
    if (!token) return res.status(401).json({
        msg: 'No hay token en la petición'
    })
    console.log('token: ', token)

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await Usuario.findById(uid)

        // Verificar que exista en la BD
        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no existe en la BD'
            })
        }

        // Verificar si el uid tiene estado true
        if (!user.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            })
        }

        console.log(user)

        req.uid = uid
        req.user = user

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validateJWT
}