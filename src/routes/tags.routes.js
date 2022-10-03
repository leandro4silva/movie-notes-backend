const {Router} = require('express')
const tagsRoutes = Router()

const TagController = require('../controllers/TagController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const tagController = new TagController() 

tagsRoutes.use(ensureAuthenticated)

tagsRoutes.get('/:user_id', tagController.index)
tagsRoutes.put('/:id', tagController.update)
tagsRoutes.delete('/:id', tagController.delete)


module.exports = tagsRoutes