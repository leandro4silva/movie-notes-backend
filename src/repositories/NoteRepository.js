const knex = require('../database/knex')

class NoteRepository{
    
    async create({title, description, rating, user_id, tags}){
        const noteId = await knex('notes').insert({
            title,
            description,
            rating,
            user_id
        })

        if (tags) {
            const notesWithTags = tags.map(tag => {
                return {
                    name: tag,
                    note_id: noteId[0],
                    user_id
                }
            })

            await knex('tags').insert(notesWithTags)
        }

        return {noteId}
    }

}

module.exports = NoteRepository