
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table){
            table.increments();
            table.string('username');
            table.string('email');
            table.string('password');
        }),
        knex.schema.createTable('categories', function(table){
            table.increments();
            table.string('picture_url');
            table.string('name');
        }),
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('categories'),
    ])
};
