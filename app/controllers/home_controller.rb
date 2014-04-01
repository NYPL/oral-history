class HomeController < ApplicationController
  
  def index
    @interviews = Interview.all
  end

end
