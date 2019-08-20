class Api::MessagesController < ApplicationController
  def index
  @group = Group.find(params[:group_id])
    respond_to do |format|  
      format.html 
      format.json { @messages = @group.messages.includes(:user).where('id >?',params[:message_id]) }
    end
  end
end