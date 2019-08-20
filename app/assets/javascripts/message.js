$(function() {
  var buildHTML = function(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url } class = "message__to">` : "";
    var html =  `<div class="message" data-message-id="${message.id}">
                  <div class = "upper-info">
                    <div class = "upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class = "upper-info__data">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class = "message__text">
                  ${content}
                  </div>
                  ${img}
                </div>`
    return html;
  };
    var reloadMessages = function() {

      var  last_message_id = $('.message:last').data('message-id');

      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(new_messages) {

      new_messages.forEach(function(message) {

        var insertHTML = buildHTML(message);  

        $('.messages').append(insertHTML);

        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
    })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    }


    if(document.URL.match(/\/groups\/\d+\/messages/)){
        setInterval(reloadMessages, 5000);
      }

});
