const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apikey } = req.query

    res.json({
        msg: 'API - Controlador - GET',
        q,
        nombre,
        apikey
    })
}

const usuariosPost = (req, res) => {
    const body = req.body

    res.json({
        msg: 'API - Controlador - POST',
        body
    })
}

const usuariosPut = (req, res) => {
    const id = req.params.usuarioId

    res.json({
        msg: 'API - Controlador - PUT',
        id
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'API - Controlador - PATCH'
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'API - Controlador - DELETE'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}