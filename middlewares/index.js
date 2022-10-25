const validateFiles = require('../middlewares/validate-files')
const validateJWT = require('../middlewares/validate-jwt')
const hasRol = require('../middlewares/validate-roles')

module.exports = {
    ...validateFiles,
    ...validateJWT,
    ...hasRol
}