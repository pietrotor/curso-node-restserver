const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generate-jwt')

const login = async (req, res = response) => {
    const {
        correo,
        password
    } = req.body

    try {
        // Verify if email exits
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no encontrado'
            })
        }
        
        // If user is active
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correcto - estado: false'
            })
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correcto - password'
            })
        }

        // Generate JWT
        const token = await generateJWT(usuario.id)


        res.json({
            msg: 'Login Ok',
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    // res.json({
    //     msg: 'Login Ok'
    // })
}

module.exports = {
    login
}