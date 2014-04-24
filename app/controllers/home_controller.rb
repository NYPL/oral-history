class HomeController < ApplicationController
  
  def index
    # @interviews = Interview.order("RANDOM()")
    # @interviews = Interview.select("annotations, id, image, slug, storyteller_name, summary, url").order("storyteller_name")
  end

end
