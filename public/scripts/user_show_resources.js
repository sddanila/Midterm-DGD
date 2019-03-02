$(() => {

  function renderToPage(card) {
    $('#my-resources').append(card);
  }

  function buildCards(data) {
    $('.card').remove();
    for(let resource of data) {
      console.log(resource.id);
      let $outerdiv = $("<div>").addClass("card").css('width', '18rem');
      let $img = $("<img>").attr('alt', 'Category Pic').attr('src', resource.picture_url).addClass("card-img-top");

      let $middleDiv = $("<div>").addClass("card-body")
                                .append($('<h5>').text(resource.title).addClass("card-title"))
                                .append($('<p>').text(resource.description).addClass('card-text'))
                                .append($('<a>').attr('href', './resources/'+resource.id).addClass('btn btn-primary').text('Go Somewhere'));
      let $bottomDiv = $('<div>').append($('<i>').addClass('fas fa-heart').text(' '+resource.count)).addClass('ranking-likes')
                                .append($('<p>').text( 'some rating / 5  Rating'));
      $outerdiv.append($img).append($middleDiv).append($bottomDiv);

      renderToPage($outerdiv);
    }
  }

  function loadAllUserData () {
    const url = $(location).attr('href').split('/');
    currentUser = url[url.length -1];
    $.ajax({
    method: "GET",
    url: `/user/${currentUser}/data`
     }).done((resources) => {
      buildCards(resources);
    }).done(results => {
      buildCards(results);
    });
   }

   loadAllUserData();














});
