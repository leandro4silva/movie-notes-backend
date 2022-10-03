const knex = require('../database/knex')
const AppError = require('../utils/AppError')


class NoteController{
    async create(request, response){

        const {title, description, rating, tags} = request.body
        const user_id = request.user.id

        if(!title){
            throw new AppError('Informe o nome da anotação, por favor!')
        }

        if(!description){
            throw new AppError('Informe uma descrição, por favor!')
        }

        if(!rating){
            throw new AppError('Informe a avaliação para o filme, por favor!')
        }

        const insertNotes = await knex('notes').insert({
            title,
            description, 
            rating,
            user_id
        })

        const insertTags = tags.map(tag => {
            return{
                name: tag,
                note_id: insertNotes[0],
                user_id
            }
        }) 

        await knex('tags').insert(insertTags)

        return response.status(201).json()
    }

    async index(request, response){
        const { title, tag } = request.query

        const user_id = request.user.id
        
        let notes

        if(tag){
            
            notes = await knex('notes').select([
                "notes.id",
                "notes.title",
                "notes.description",
                "notes.rating",
                "notes.user_id",
            ])
            .where("notes.user_id", user_id)
            .whereLike("tags.name", `%${tag}%`)
            .whereLike("notes.title", `%${title}%`)
            .innerJoin('tags', 'tags.note_id', 'notes.id')
            .groupBy('notes.id')
            .orderBy('title')

        }else{
            notes = await knex('notes').select([
                "notes.id",
                "notes.title",
                "notes.description",
                "notes.rating",
                "notes.user_id",
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.title", `%${title}%`)
            .groupBy('notes.id')
            .orderBy('title')
        }

        const selectAllTags = await knex('tags').where({user_id})

        const notesWithTags = notes.map(notes => {
            const tags = selectAllTags.filter(tag => notes.id == tag.note_id).map(tag => {
                return tag.name
            })

            return {
                ...notes,
                tags
            }
        })
        
        return response.json(notesWithTags)
    }

    async show(request, response){
        const {id} = request.params

        const notes = await knex('notes').where({id}).first()
        const tags = await knex('tags').where('note_id', id)

        return response.json({
            ...notes,
            tags
        })
    }

    async update(request, response){
        const {id} = request.params
        const {title, description, rating} = request.body

        const note = await knex('notes').where({id}).first()

        note.title = title ?? note.title
        note.description = description ?? note.description
        note.rating = rating ?? note.rating 
        note.updated_at = knex.fn.now()

        await knex('notes').update(
            {
                title: note.title, 
                description: note.description, 
                rating: note.rating,
                updated_at: note.updated_at
            }
        ).where({id})    

        return response.status(200).json()
    }

    async delete(request, response){
        const {id} = request.params

        await knex('notes').delete().where({id})

        return response.status(200).json({})
    }
}

module.exports = NoteController