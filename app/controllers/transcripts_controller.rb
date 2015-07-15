class TranscriptsController < ApplicationController

  def show
    @interview = Interview.find_by_slug(params[:id])
  end

  def edit
    @interview = Interview.find_by_slug(params[:id])
  end

  def save
    @interview = Interview.find_by_slug(params[:id])
  end

end
