class Admin::AnnotationsController < ApplicationController
  
  before_filter :authenticate_admin!
  
  layout "simple"
  
  # GET /admin/annotations
  # GET /admin/annotations.json
  def index
   
    respond_to do |format|
      format.html # index.html.erb
      format.json {
         @interviews = Interview.select("annotations, interviews.id, interviews.slug, storyteller_name").where("is_demo = ? AND annotations != ?", 0, "")
        render json: @interviews
      }
    end
  end

end
