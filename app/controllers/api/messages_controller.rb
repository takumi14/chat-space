class Api::MessagesController < ApplicationController
  def index
    @message = Message.new
    
    @group = Group.find(params[:group_id])            #今いるグループの情報をパラムスの値を元にDBから取得。

    @messages = @group.messages.includes(:user)

    respond_to do |format|
      format.html                          
      format.json { @new_messages = @messages.where('id > ?', params[:id]) }   #グループが所有しているメッセージの中から、params[:last_id]よりも大きいidがないかMessageから検索して、@messagesに代入。
    end
  end
end 