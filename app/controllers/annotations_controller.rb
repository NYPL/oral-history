class AnnotationsController < ApplicationController
  
  def start
    @interview = Interview.find_by_slug(params[:id])
  end
  
  def mark
    @interview = Interview.find_by_slug(params[:id])
  end
  
  def transcribe
    @interview = Interview.find_by_slug(params[:id])  
  end

end
