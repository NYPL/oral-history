class HomeController < ApplicationController
  
  def index
    @neighborhoods = Neighborhood.where(:is_featured => 1)
    @features = Feature.where(:is_active => 1).order("RANDOM()")
  end

end
