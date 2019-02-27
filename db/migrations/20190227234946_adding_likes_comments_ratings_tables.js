
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('likes', function(table){
            table.increments();
            table.integer('resource_id'),
            table.integer('user_id'),
            table.foreign('resource_id').references('id').on('resources');
            table.foreign('user_id').references('id').on('users');
        }),
        knex.schema.createTable('comments', function(table){
            table.increments();
            table.text('comment');
            table.integer('resource_id'),
            table.integer('user_id'),
            table.foreign('user_id').references('id').on('users');
            table.foreign('resource_id').references('id').on('resources');
        }),
        knex.schema.createTable('ratings', function(table){
            table.increments();
            table.integer('ratings');
            table.integer('resource_id'),
            table.integer('user_id'),
            table.foreign('resource_id').references('id').on('resources');
            table.foreign('user_id').references('id').on('users');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('likes', function(table){
            table.dropForeign('resource_id');
            table.dropForeign('user_id');
        }),
        knex.scheme.dropTable('likes'),
        knex.schema.table('comments', function(table){
            table.dropForeign('resource_id');
            table.dropForeign('user_id');
        }),
        knex.scheme.dropTable('comments'),
        knex.schema.table('ratings', function(table){
            table.dropForeign('resource_id');
            table.dropForeign('user_id');
        }),
        knex.scheme.dropTable('ratings'),
    ])
};