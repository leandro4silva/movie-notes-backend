class NoteRepositoryInMemory{

    async create({title, description, rating, user_id, tags}){
        const note = {
            id: Math.floor(Math.random() * 1000) + 1,
            title,
            description, 
            rating,
            user_id
        }

        if(tags){
            const noteWithTag = {
                ...note,
                tags
            }
        }

        return note
    }

}


module.exports = NoteRepositoryInMemory