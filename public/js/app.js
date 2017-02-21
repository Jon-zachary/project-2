$(document).ready(() => {
  console.log('jQuery is working!');

  $('#create-thread').on('click', () => {
    $('#new-content-container').addClass('modal-animation');
    $('#overlay').css('display','block');
  });

  $('#post-reply').on('click', () => {
    $('#new-content-container').addClass('modal-animation');
    $('#overlay').css('display','block');
  });

  $('#close-modal').on('click', () => {
    $('#overlay').css('display', 'none');
    $('#new-content-container').removeClass('modal-animation');
  });

  $('#new-post-form').on('submit', (e) => {
    if($('input[name="posts[title]"]').val() === '' || $('textarea[name="posts[content]"]').val() === '') {
      alert('Please make sure you\'ve entered a title and post description.');
      return false;
    }
  });

  $('#post-reply-form').on('submit', (e) => {
    if($('textarea[name="comments[content]"]').val() === '') {
      alert('You cannot submit an empty comment.');
      return false;
    }
  });

});
