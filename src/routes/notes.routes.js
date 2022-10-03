const {Router} = require('express')
const notesRoutes = Router()

const NoteController = require('../controllers/NoteController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const noteController = new NoteController()

notesRoutes.use(ensureAuthenticated)


notesRoutes.post('/', noteController.create)
notesRoutes.get('/', noteController.index)
notesRoutes.get('/:id', noteController.show)
notesRoutes.put('/:id', noteController.update)
notesRoutes.delete('/:id', noteController.delete)


module.exports = notesRoutes
