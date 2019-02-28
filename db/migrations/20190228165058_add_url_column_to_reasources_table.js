
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('resources', function(table){
            table.text('url');
        }),
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('resources', function(table){
            table.dropColumn('url');
        })
    ])
};