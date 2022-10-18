const AppError = require('../utils/AppError')

class NoteCreateService{
    constructor(noteRepository){
        this.noteRepository = noteRepository
    }

    async execute({ title, description, rating, tags, user_id }){
        if (!title) {
            throw new AppError('Informe o nome da anotação, por favor!')
        }

        if (!description) {
            throw new AppError('Informe uma descrição, por favor!')
        }

        if (!rating) {
            throw new AppError('Informe a avaliação para o filme, por favor!')
        }

        const note = await this.noteRepository.create({
            title,
            description,
            rating,
            user_id, 
            tags
        })

        return note
    }
}

module.exports = NoteCreateService