const {hash, compare} = require('bcrypt')
const AppError = require('../utils/AppError')
const knex = require('../database/knex')
const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require("../services/UserCreateService")

class UserController{
    async index(request, response){
        try{
            const selectAllUsers = await knex('users')   
            response.json(selectAllUsers)
        }catch(error){
            throw new AppError('Unexpect error while select users')
        }
    }

    async create(request, response){
        const {name, email, password} = request.body

        const userRepository = new UserRepository;
        const userCreateService = new UserCreateService(userRepository)

        await userCreateService.execute({name, email, password})

        return response.status(201).json()       
    }

    async show(request, response){
        const user_id = request.user.id

        const selectUser = await knex('users').where({id: user_id})

        response.json(selectUser)
    }

    async update(request, response){
        const {name, email, password, old_password} = request.body
        const user_id = request.user.id

        const user = await knex('users').where({id : user_id}).first()

        if(!user){
            throw new AppError("O usuario não foi encontrado")
        }

        if(email){
            const emailExist = await knex('users').where({email}).first()
            
            if(emailExist && emailExist.id != user_id){
                throw new AppError('Esse email já esta em uso')
            }
        }

        if(password){
            const checkOldPassword = await compare(old_password, user.password)
            const checkPassword = password.split('').length

            if(!checkOldPassword){
                throw new AppError('A antiga senha não está correta!')
            }

            if(checkPassword < 6){
                throw new AppError('Insira uma senha com mais de 6 caracteres, por favor!')
            }

            user.password = await hash(password, 8)
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        await knex('users').update(
            {
                name: user.name, 
                email: user.email, 
                password: user.password
            }
        ).where({id: user_id})
        
        response.status(200).json()
    }
}

module.exports = UserController