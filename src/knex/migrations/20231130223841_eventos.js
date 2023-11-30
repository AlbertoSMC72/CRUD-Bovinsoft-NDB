/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function(knex) {
    return knex.schema.createTable('eventos', function(table) {
      table.increments('id_evento').primary();
      table.integer('id_bovino').unsigned().notNullable();
      table.foreign('id_bovino').references('id_bovino').inTable('bovino').onDelete('NO ACTION').onUpdate('NO ACTION');
      table.string('titulo', 25).notNullable();
      table.string('asunto', 15);
      table.dateTime('fecha_reporte').defaultTo(knex.fn.now());
      table.text('descripcion');
      table.dateTime('fecha_reinsidio');
      table.boolean('evento_terminado').notNullable().defaultTo(0);
      table.integer('created_by').unsigned().notNullable();
      table.foreign('created_by').references('id_administrador').inTable('administradores').onDelete('NO ACTION').onUpdate('NO ACTION');
      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.boolean('deleted').notNullable().defaultTo(0);
      table.dateTime('deleted_at');
  
      // Índices
      table.index('titulo', 'idx_titulo_eventos');
      table.index('asunto', 'idx_asunto_eventos');
      table.index('evento_terminado', 'idx_evento_terminado_eventos');
      table.index('id_bovino', 'idx_id_bovino_eventos');
    });
  };
  
  /**
   * @param {import("knex").Knex} knex
   * @returns {Promise<void>}
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('eventos');
  };
  