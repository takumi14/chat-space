$(function(){
  
  function buildHTML(message) {
    var image = message.image? `${message.image}` : "";
    var html = `<div class="message">
                  <div class = "message__upper-info">
                    <div class = "message__upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class = "message__upper-info__data">
                      ${message.time}
                    </div>
                  </div>
                  <div class = "message__text">
                    ${message.content}
                  </div>
                  <div>
                    <img class ="lower-message__image" src="${message.image}">
                  </div>
                </div>`

    return html
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message) {
      console.log(message)
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
      $("#new_message")[0].reset();
    })
    .fail(function() {
      alert('error');
      $('.form__submit').prop('disabled', false);
    });
  })
})  