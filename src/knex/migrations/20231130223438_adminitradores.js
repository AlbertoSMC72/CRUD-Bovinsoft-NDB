/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function (knex) {
    return knex.schema.createTable('administradores', function (table) {
        table.increments('id_administrador').primary();
        table.string('password', 100).notNullable();
        table.string('correo', 45).notNullable();
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at');

        table.index('correo', 'idx_correo_administradores');
    });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.down = function (knex) {
    return knex.schema.dropTable('administradores');
};
