const knex  = require("../database/knex")

class TagController{
    async index(request, response){
        const {user_id} = request.params

        const selectAllTags =  await knex('tags').where({user_id})

        return response.json(selectAllTags)
    }

    async update(request, response){
        const {id} = request.params
        const {name} = request.body

        const tag = knex('tags').where({id})

        tag.name = name ?? tag.name
        
        await knex('tags').update(
            {
                name: tag.name 
            }
        ).where({id})

        return response.status(200).json()
    }

    async delete(request, response){
        const {id} = request.params

        await knex('tags').delete().where({id})

        return response.status(200).json({})
    }
}


module.exports = TagController