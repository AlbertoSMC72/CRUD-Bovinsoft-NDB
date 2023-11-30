/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function(knex) {
    return knex.schema.createTable('bovino', function(table) {
      table.increments('id_bovino').primary();
      table.string('siniiga', 50);
      table.string('arete_bovino', 50).defaultTo('No agregado');
      table.integer('id_toro').unsigned();
      table.foreign('id_toro').references('id_bovino').inTable('bovino').onDelete('NO ACTION').onUpdate('NO ACTION');
      table.integer('id_vaca').unsigned();
      table.foreign('id_vaca').references('id_bovino').inTable('bovino').onDelete('NO ACTION').onUpdate('NO ACTION');
      table.string('nombre', 50).notNullable();
      table.string('raza', 50).notNullable();
      table.string('genero', 10).notNullable();
      table.date('fecha_nacimiento').notNullable();
      table.string('foto_perfil', 100);
      table.string('pedigri', 100);
      table.string('tipo_nacimiento', 50);
      table.integer('created_by').unsigned().notNullable();
      table.foreign('created_by').references('id_administrador').inTable('administradores').onDelete('NO ACTION').onUpdate('NO ACTION');
      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.boolean('deleted').notNullable().defaultTo(0);
      table.dateTime('deleted_at');
      
      // Índices
      table.index('id_bovino', 'idx_id_bovino');
      table.index('arete_bovino', 'idx_arete_bovino');
      table.index('created_at', 'idx_created_at_bovino');
    });
  };
  
  /**
   * @param {import("knex").Knex} knex
   * @returns {Promise<void>}
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('bovino');
  };
  