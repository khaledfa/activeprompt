class ResponsesController < ApplicationController
  def create
    @prompt = Prompt.find(params[:prompt_id])
    @response = @prompt.responses.create(params[:response])
    redirect_to prompt_path(@prompt)
  end
end
