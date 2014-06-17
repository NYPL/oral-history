class NeighborhoodsController < ApplicationController
  # GET /neighborhoods
  # GET /neighborhoods.json
  def index
    @neighborhood = Neighborhood.first
    
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @neighborhood }
    end
  end

  # GET /neighborhoods/1
  # GET /neighborhoods/1.json
  def show
    @neighborhood = Neighborhood.find_by_slug(params[:id])

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