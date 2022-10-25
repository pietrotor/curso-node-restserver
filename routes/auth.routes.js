const { Router } = require('express')
const { check } = require('express-validator')

const { login } = require('../controllers/auth.controller')
const { validateJWT } = require('../middlewares/validate-jwt')
const { validateFiles } = require('../middlewares/validate-files')

const router = Router()

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validateFiles
], login)

module.exports = router
