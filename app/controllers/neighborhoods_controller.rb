class NeighborhoodsController < ApplicationController
  # GET /neighborhoods
  # GET /neighborhoods.json
  def index
    @neighborhood = Neighborhood.order("created_at").first
    
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @neighborhood }
    end
  end

  # GET /neighborhoods/1
  # GET /neighborhoods/1.json
  def show
    @neighborhood = Neighborhood.find_by_slug(params[:id])
    @branches = Branch.select("DISTINCT branches.id, branches.name, branches.slug")
                  .joins("INNER JOIN interviews ON interviews.branch_id = branches.id")
                  .where("interviews.neighborhood_id = ? AND is_demo = ?", @neighborhood.id, 0)
                  .order("name")
    
    # @branches = Branch.all
    
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @neighborhood }
    end
  end
  
  def demo
    @neighborhood = Neighborhood.first
    
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @neighborhood }
    end
  end

end