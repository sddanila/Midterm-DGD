exports.seed = function(knex, Promise) {
  return knex('likes').del()
    .then(function() { return knex('comments').del() })
    .then(function() { return knex('ratings').del() })
    .then(function() { return knex('resources').del() })
    .then(function() { return knex('users').del() })
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 7, username: 'dpicard', email: 'd@picard.com', password: 'password'}),
        knex('users').insert({id: 8, username: 'gbrasil', email: 'g@brasil.com', password: 'password'}),
        knex('users').insert({id: 9, username: 'dbarton', email: 'd@barton.com', password: 'password'}),
        knex('categories').insert({picture_url: 'https://github.com/sddanila/Midterm-DGD/blob/master/images/fitness.jpg' , name: 'Health and Fitness'}),
        knex('categories').insert({picture_url: 'https://github.com/sddanila/Midterm-DGD/blob/master/images/food.jpg' , name: 'Food and Dining'}),
        knex('categories').insert({picture_url: 'https://github.com/sddanila/Midterm-DGD/blob/master/images/sports.jpg' , name: 'Sports'}),
      ]);
    }).then(function () {
      return Promise.all([
        knex('resources').insert({id: 11, user_id: 7, title: 'Hockey is the best sport in the world', description: 'I am Canadian and there is nothing better than playing hockey. Well, maybe lacrosse.', category_id: 3, url: 'https://therattrick.com/8078/08/07/top-70-reasons-why-hockey-is-the-greatest-sport/'}),
        knex('resources').insert({id: 12, user_id: 8, title: 'Exercise is important', description: 'If you go to the gym every day, then it doesnt matter how much you snack!', category_id: 1, url: 'https://foodandnutrition.org/july-august-8075/science-says-snacking/'}),
        knex('resources').insert({id: 13, user_id: 9, title: 'Eating is the best sport', description: 'Food is the best medicine for the soul. It makes me feel happier!', category_id: 2, url: 'https://www.psychologytoday.com/ca/blog/the-heart/807904/foods-the-soul'}),
      ])
    }).then(function (){
      return Promise.all([
        knex('likes').insert({resource_id: 12, user_id: 9}),
        knex('likes').insert({resource_id: 13, user_id: 7}),
        knex('likes').insert({resource_id: 11, user_id: 8}),
        knex('comments').insert({user_id: 8, comment: 'Totally agree!', resource_id: 13}),
        knex('comments').insert({user_id: 9, comment: 'Heck yeeeeeaaaaah!', resource_id: 11}),
        knex('comments').insert({user_id: 7, comment: 'Yes, yes, and yes!', resource_id: 12}),
        knex('ratings').insert({user_id: 7, ratings: 4, resource_id: 12}),
        knex('ratings').insert({user_id: 9, ratings: 4, resource_id: 11}),
        knex('ratings').insert({user_id: 8, ratings: 4, resource_id: 13}),
      ])
    })
};

// Promise.all(
//   //insert all users
// ).then(() => { 
//   return knex('users').select('id')
// })
// .then((users) => {
//   users.map(user => {
//     knex('resources').insert({user_id: user.id, title: 'Hockey is the best sport in the world',
//      description: 'I am Canadian and there is nothing better than playing hockey. Well, maybe lacrosse.',
//       category_id: 3, 
//     url: 'https://therattrick.com/8078/08/07/top-70-reasons-why-hockey-is-the-greatest-sport/'}),
//   })
// })