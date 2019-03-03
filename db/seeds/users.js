exports.seed = function(knex, Promise) {
  return knex('likes').del()
    .then(function() { return knex('comments').del() })
    .then(function() { return knex('ratings').del() })
    .then(function() { return knex('resources').del() })
    .then(function() { return knex('users').del() })
    .then(function() { return knex('categories').del() })
    .then(function () {
      return Promise.all([
        // knex('users').insert({id: 1, username: 'dpicard', email: 'd@picard.com', password: 'password'}),
        // knex('users').insert({id: 2, username: 'gbrasil', email: 'g@brasil.com', password: 'password'}),
        // knex('users').insert({id: 3, username: 'dbarton', email: 'd@barton.com', password: 'password'}),
        knex('categories').insert({id: 1, picture_url: '../images/crafts.jpg' , name: 'DIY and Crafts'}),
        knex('categories').insert({id: 2, picture_url: '../images/fitness.jpg' , name: 'Health and Fitness'}),
        knex('categories').insert({id: 3, picture_url: '../images/food.jpg' , name: 'Food and Dining'}),
        knex('categories').insert({id: 4, picture_url: '../images/home_decor.jpg' , name: 'Home Decor'}),
        knex('categories').insert({id: 5, picture_url: '../images/kids.jpg' , name: 'Kids'}),
        knex('categories').insert({id: 6, picture_url: '../images/movies.jpg' , name: 'Entertainment'}),
        knex('categories').insert({id: 7, picture_url: '../images/other.jpg' , name: 'Other'}),
        knex('categories').insert({id: 8, picture_url: '../images/sports.jpg' , name: 'Sports'}),
        knex('categories').insert({id: 9, picture_url: '../images/technology.jpg' , name: 'Technology'}),
        knex('categories').insert({id: 10, picture_url: './images/travel.jpg' , name: 'Travel'}),
      ]);
    // }).then(function () {
    //   return Promise.all([
    //     knex('resources').insert({id: 1, user_id: 1, title: 'Hockey is the best sport in the world', description: 'I am Canadian and there is nothing better than playing hockey. Well, maybe lacrosse.', category_id: 8, url: 'https://therattrick.com/8078/08/07/top-70-reasons-why-hockey-is-the-greatest-sport/'}),
    //     knex('resources').insert({id: 2, user_id: 3, title: 'Exercise is important', description: 'If you go to the gym every day, then it doesnt matter how much you snack!', category_id: 2, url: 'https://foodandnutrition.org/july-august-8075/science-says-snacking/'}),
    //     knex('resources').insert({id: 3, user_id: 2, title: 'Eating is the best sport', description: 'Food is the best medicine for the soul. It makes me feel happier!', category_id: 3, url: 'https://www.psychologytoday.com/ca/blog/the-heart/807904/foods-the-soul'}),
    //   ])
    // }).then(function (){
    //   return Promise.all([
    //     knex('likes').insert({resource_id: 1, user_id: 2}),
    //     knex('likes').insert({resource_id: 2, user_id: 3}),
    //     knex('likes').insert({resource_id: 3, user_id: 1}),
    //     knex('comments').insert({user_id: 3, comment: 'Totally agree!', resource_id: 1}),
    //     knex('comments').insert({user_id: 1, comment: 'Heck yeeeeeaaaaah!', resource_id: 2}),
    //     knex('comments').insert({user_id: 2, comment: 'Yes, yes, and yes!', resource_id: 3}),
    //     knex('ratings').insert({user_id: 1, ratings: 4, resource_id: 3}),
    //     knex('ratings').insert({user_id: 2, ratings: 3, resource_id: 1}),
    //     knex('ratings').insert({user_id: 3, ratings: 4, resource_id: 2}),
    //   ])
    // })
});
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
