$(() => {

    const url = $(location).attr('href').split('/');
    currentresource = url[url.length -1];

  $('#ratingID').on('submit', (event) => {
    event.preventDefault();
    let value = $('#ratingID').serialize().split('=')[1];

    $.ajax({
    method: "POST",
    url: `/resources/${currentresource}/rating`,
    data: {rating: value}
     }).done((resources) => {
      console.log('Im back');
      $('#ratingID').css('display', 'none');
    });
  });

  $('#like-button').on('click', (event) => {
    $.ajax({
    method: "POST",
    url: `/resources/${currentresource}/like`,
     }).done((resources) => {
      console.log($('#likeCount').text());
      $('#likeCount').text( Number($('#likeCount').text()) + 1);
      $('#like-button').css('display','none');
    });
   });















});
