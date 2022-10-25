const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query

    const query = { estado: true }

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])


    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync() // Tiene 10 vueltas
    usuario.password = bcryptjs.hashSync(password, salt)
    
    // Gurdar en BD
    await usuario.save()

    res.json({usuario})
}

const usuariosPut = async(req, res) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync() // Tiene 10 vueltas
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'API - Controlador - PUT',
        usuario
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'API - Controlador - PATCH'
    })
}

const usuariosDelete = async(req, res) => {

    const { id } = req.params

    const { user } = req
    console.log(user)
    // Fisicamente lo borramos
    // const  usuario = await Usuario.findByIdAndDelete(id)

    // Cambiamos su estado a inactivo
    const  usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    
    res.json({
        msg: 'API - Controlador - DELETE',
        usuario,
        user
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}