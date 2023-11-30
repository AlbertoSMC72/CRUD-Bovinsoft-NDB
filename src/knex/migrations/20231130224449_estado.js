/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function(knex) {
    return knex.schema.createTable('estado', function(table) {
      table.increments('id_estado').primary();
      table.integer('id_bovino').unsigned().notNullable();
      table.foreign('id_bovino').references('id_bovino').inTable('bovino').onDelete('NO ACTION').onUpdate('NO ACTION');
      table.string('estado', 45).notNullable();
      table.dateTime('created_at').defaultTo(knex.fn.now());
  
      // Índices
      table.index('estado', 'idx_estado_estado');
      table.index('id_bovino', 'idx_id_bovino_estado');
    });
  };
  
  /**
   * @param {import("knex").Knex} knex
   * @returns {Promise<void>}
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('estado');
  };
  