class HomeController < ApplicationController

  def index
    @neighborhoods = Neighborhood.where(:is_featured => 1).order("created_at")
    @features = Feature.where(:is_active => 1).order("RANDOM()").limit(3)
  end

end
