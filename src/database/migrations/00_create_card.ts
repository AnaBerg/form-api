import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('card', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('cpf').notNullable();
    table.string('card').notNullable();
    table.string('cvv').notNullable();
    table.string('expDate').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('card');
}
