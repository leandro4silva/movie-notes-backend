const {Router} = require('express')
const sessionRoutes = Router()

const SessionController = require('../controllers/SessionController')
const sessionController = new SessionController()

sessionRoutes.post('/', sessionController.create)


module.exports = sessionRoutes