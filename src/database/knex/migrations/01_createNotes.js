exports.up = function(knex) {
  return knex.schema.createTable('notes', table => {
    table.increments('id')
    table.text('title').notNullable()
    table.text('description')
    table.integer('rating')

    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
    
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())

})
};

exports.down = function(knex) {
    return knex.schema.dropTable('notes')
};
