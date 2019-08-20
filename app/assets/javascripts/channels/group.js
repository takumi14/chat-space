$(function() {
  var search_list = $(".user-search-result");
  var menber_list = $(".chat-group-user");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<ul>
                  <li>
                    <div class="chat-group-user clearfix">
                      <p>${user}</p>
                    </div>
                  </li>
                </ul>`
    search_list.append(html);
  }



  function appendMembers(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
            <input name='group[user_ids][]' type='hidden' value=${ user_id }>
            <p class='chat-group-user__name'>${name}</p>
            <div class='user_search_remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>`
    menber_list.append(html);
}

$(function(){
    $('#user-search-field').on("keyup", function() {
    var input = $.trim($(this).val());

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUser(user);
        });
      }
      else{
        $('#user-search-result').empty();
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert('ユーザ検索に失敗しました。');
    });
  })

  $(function(){
    $(document).on("click",'.user-search-add', function() {
      var user_id = $(this).data("user-id");
      var name = $(this).data("user-name");
      appendMembers(name, user_id);
      $(this).parent().remove();
      });

      $(document).on("click", '.user_search_remove', function () {
          $(this).parent().remove();
      });
    });
  });
});