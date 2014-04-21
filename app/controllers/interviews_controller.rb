class InterviewsController < ApplicationController

  # GET /interviews/1
  # GET /interviews/1.json
  def show
    @interview = Interview.find_by_slug(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @interview }
    end
  end

  # PUT /interviews/1
  # PUT /interviews/1.json
  def update
    @interview = Interview.find_by_slug(params[:id])
    
    # only update annotations
    annotations = params[:interview][:annotations]

    respond_to do |format|
      if @interview.update_attributes(:annotations => annotations)
        format.html { redirect_to @interview, notice: 'Interview was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @interview.errors, status: :unprocessable_entity }
      end
    end
  end

end
