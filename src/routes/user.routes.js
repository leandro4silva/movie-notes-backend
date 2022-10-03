const { Router}= require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const UserController = require('../controllers/UserController')
const userController = new UserController()

const UserAvatarController = require('../controllers/UserAvatarController')
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.MULTER)

const userRoutes = Router()

userRoutes.get('/all', userController.index)
userRoutes.post('/', userController.create)
userRoutes.get('/', ensureAuthenticated, userController.show)
userRoutes.put('/', ensureAuthenticated, userController. update)
userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)


module.exports = userRoutes