


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

      var last_message_id = $('.message:last').data('message-id');
      
      //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。

      $.ajax({                                     //ajax通信で以下のことを行う
        url: "api/messages",                      //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get',                              //メソッドを指定
        dataType: 'json',                        //データはjson形式
        data: {id: last_message_id}             //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためid
      })
      .done(function(new_messages) {             //通信成功したら、controllerから受け取ったデータ（new_messages)を引数にとって以下のことを行う

        new_messages.forEach(function(message) {    //配列new_messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        var insertHTML = buildHTML(message);      //追加するHTMLの入れ物を作り、メッセージが入ったHTMLを取得
        $('.messages').append(insertHTML);        //メッセージを追加
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');   //最新のメッセージが一番下に表示されようにスクロールする。
      })
    })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    }


    if(document.URL.match(/\/groups\/\d+\/messages/)){  //今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
        setInterval(reloadMessages, 5000);
      }

});