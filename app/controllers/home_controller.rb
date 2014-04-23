class HomeController < ApplicationController
  
  def index
    @interviews = Interview.order("RANDOM()")
  end

end
