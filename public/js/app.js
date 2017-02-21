$(document).ready(() => {
  console.log('jQuery is working!');

  // Create thread modal animation
  $('#create-thread').on('click', () => {
    $('#new-content-container').addClass('modal-animation');
    $('#overlay').css('display','block');
  });

  // New reply modal animation
  $('#post-reply').on('click', () => {
    $('#new-content-container').addClass('modal-animation');
    $('#overlay').css('display','block');
  });

  // Close any modal logic
  $('#close-modal').on('click', () => {
    $('#overlay').css('display', 'none');
    $('#new-content-container').removeClass('modal-animation');
  });

  // On new post form, if input fields are empty alert('message'), return false
  $('#new-post-form').on('submit', (e) => {
    if($('input[name="posts[title]"]').val() === '' || $('textarea[name="posts[content]"]').val() === '') {
      alert('Please make sure you\'ve entered a title and post description.');
      return false;
    }
  });

  // One new reply form, if text area is empty, alert('message'), return false
  $('#post-reply-form').on('submit', (e) => {
    if($('textarea[name="comments[content]"]').val() === '') {
      alert('You cannot submit an empty comment.');
      return false;
    }
  });

  // On '.reply-btn' click, show next child with class '.new-reply-form'
  $('.reply-btn').on('click', function(e) {
    e.preventDefault();
    $(this).next('.new-reply-form').show();
  });

});
