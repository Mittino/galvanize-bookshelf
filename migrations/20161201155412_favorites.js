'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table){
    table.increments();
    table.integer('book_id').references('books.id').onDelete('cascade').notNullable();
    table.integer('user_id').references('users.id').onDelete('cascade').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable()
};
