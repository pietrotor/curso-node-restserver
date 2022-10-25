const { response } = require("express")

const isAdminRol = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quire verificar el rol sin validar el token primero'
        })
    }

    const { rol, nombre } = req.user

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no tiene un rol de administrador`
        })
    }

    next()
}

const hasRol = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quire verificar el rol sin validar el token primero'
            })
        }
        
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles: ${roles}`
            })
        }

        next()
    }
}

module.exports = {
    isAdminRol,
    hasRol
}