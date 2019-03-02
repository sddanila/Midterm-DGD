$(() => {

  $( "#form-submit" ).submit(function(event) {
    event.preventDefault();
      var newTweet = $(this).serialize();
      if ($('textarea').val() === "" || $('textarea').val() === null) {
        $('.error').text('You didn\'t fill out your tweet.').slideToggle('fast');
      } else if ($('.counter').text() < 0) {
        $('.error').text('Only 140 character tweets are allowed. Keep your tweets short and to the point').slideToggle('fast');
      } else {
        $.post('/tweets/', newTweet, function (data) {
          $('#tweet-container').prepend(createTweetElement(data));
          $('#submit')[0].reset();
          $('.counter').text(140);
        });
      }
  });


});