class SearchController < ApplicationController

  def index
    @neighborhoods = Neighborhood.where(:is_featured => 1).order("created_at")
    @collection_id = ""
    if params[:filters].present? && params[:filters][:collection_id].present?
      @collection_id = params[:filters][:collection_id]
    end
  end

end
