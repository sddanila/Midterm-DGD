
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('resources', function(table){
            table.increments();
            table.string('title');
            table.text('description');
            table.timestamp('created_at');
            table.integer('category_id'),
            table.integer('user_id'),
            table.foreign('category_id').references('id').on('categories');
            table.foreign('user_id').references('id').on('users');
        }),
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('resources', function(table){
            table.dropForeign('category_id');
            table.dropForeign('user_id');
        }),
        knex.schema.dropTable('resources'),
    ])
};
