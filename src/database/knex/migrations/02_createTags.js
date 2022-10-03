
exports.up = function(knex) {
  return knex.schema.createTable('tags', table => {
    table.increments('id')
    table.text('name').notNullable()
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tags')
};
