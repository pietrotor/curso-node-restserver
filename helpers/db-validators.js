const Role = require('../models/role')
const usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {
    const exitsRol = await Role.findOne({ rol })
    if (!exitsRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const emailExiste = async(correo) => {
    existsEmail = await usuario.findOne({ correo })
    
    if (existsEmail) {
        throw new Error(`El email ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id) => {
    existeId = await usuario.findById(id)
    if (!existeId) {
        throw new Error(`El id ${id} no existe en la base de datos`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}