class HomeController < ApplicationController
  
  def index
    # @interviews = Interview.order("RANDOM()")
    # @interviews = Interview.select("annotations, id, image, slug, storyteller_name, summary, url").order("storyteller_name")
    @neighborhoods = Neighborhood.where(:is_featured => 1)
  end

end
