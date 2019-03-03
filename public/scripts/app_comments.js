
$(() => {
  const url = $(location).attr('href').split('/');
  currentUser = url[url.length - 1];

  function loadComments() {
    $.get(`/resources/${currentUser}/comments`, function (data) {
      createComments(data);
    });
  }

  function createComments(data) {
    for(let resource of data) {
      let $bottomDiv = $("<div>").addClass("card-body-comments")
                                .append($('<h6>').addClass("username-comments").text(resource.username))
                                .append($('<p>').addClass('user-comments').text(resource.comment));

      $('#card-comments').prepend($bottomDiv);
    }
  }

  $( "#form-comments" ).submit(function(event) {
    event.preventDefault();
      var newComment = $(this).serialize();
      if ($('textarea').val() === "" || $('textarea').val() === null) {
        alert('You didn\'t write anything in your comment.');
      } else {
        $.post(`/resources/${currentUser}/comments`, newComment, function (data) {
        });
      }
      let comment = newComment.split('=')[1].replace(/%20/g, ' ');
      createComments([{username: 'You', comment: comment}]);
  });

  loadComments();
  });
