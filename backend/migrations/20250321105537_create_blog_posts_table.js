/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('blog_posts', function(table) {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('excerpt').notNullable();
    table.date('date').notNullable();
    table.string('category', 100).notNullable();
    table.string('image', 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('blog_posts');
};
