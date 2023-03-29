const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    price: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    branch: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
})

ProductSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario
}

module.exports = model('Usuario', ProductSchema)