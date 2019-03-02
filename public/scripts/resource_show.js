// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });



$(() => {

    function renderToPage(card) {
      $('.cards-container-show').append(card);
    }
  
    function buildCards(data) {
      $('#register1').remove();
      for(let resource of data) {
        let $outerdiv = $("<div>").addClass("card").css('width', '34rem');
        let $img = $("<img>").attr('alt', 'Category Pic').attr('src', resource.picture_url).addClass("card-img-top");
  
        let $middleDiv = $("<div>").addClass("card-body")
                                  .append($('<h5>').text(resource.title).addClass("card-title"))
                                  .append($('<p>').text(resource.description).addClass('card-text'))
                                  .append($('<a>').attr('href', './resources/'+resource.id).addClass('btn btn-primary').text('Go Somewhere'));
        let $bottomDiv = $('<div>').append($('<i>').addClass('fas fa-heart').text(' '+resource.count)).addClass('ranking-likes')
                                  .append($('<p>').text(rounder(resource.avg)+ ' / 5  Rating'));
        $outerdiv.append($img).append($middleDiv).append($bottomDiv);
  
        renderToPage($outerdiv);
      }
    }
  
    function loadAllData () {
      $.ajax({
      method: "GET",
      url: "/resources"
       }).done((resources) => {
        buildCards(resources);
      });
     }
  
  //Loads all Data
    loadAllData();
  //Search bar ajax request
    $('#comments').on('submit', function(event) {
      event.preventDefault();
      const search = {};
      console.log('this serialize: ---- '$(this).serialize())
      search.parameter = ($(this).serialize().split('=')[1]);
    //   console.log(search);
    //   $.ajax({
    //     method: 'GET',
    //     url:'/resources',
    //     data: search
        }).done(returnData => {
        buildCards(returnData);
      });
    });
  
  });
  