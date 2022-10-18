const {hash} = require('bcrypt')
const AppError = require('../utils/AppError')

class UserCreateService{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({name, email, password}){
        const checkPassword = String(password).length

        if(checkPassword < 6){
            throw new AppError('Insira uma senha com mais de 6 caracteres por favor!')
        }

        if(!name){
            throw new AppError('Insira o seu nome, por favor!')
        }
        
        const emailExist = await this.userRepository.findByEmail(email);

        if(emailExist){
            throw new AppError('Esse email já esta registrado, tente com algum outro!')
        }

        const hashedPassword = await hash(password, 8)

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

        return userCreated
    }   
}

module.exports = UserCreateService