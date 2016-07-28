class InterviewsController < ApplicationController

  # GET /interviews?neighborhood_id=1
  # GET /interviews?updated_after=yyyy-mm-dd
  def index
    if params[:neighborhood_id]
      @neighborhood = Neighborhood.find_by_slug(params[:neighborhood_id])
      @interviews = Interview.select("interviews.id, interviews.image, interviews.slug, storyteller_name, summary, url, location, notes, occupations, other_locations, place_of_birth, branch_id, branches.name AS branch_name")
                             .joins("INNER JOIN branches ON interviews.branch_id = branches.id")
                             .where("interviews.neighborhood_id = ? AND is_demo = ?", @neighborhood.id, 0)
                             .order("storyteller_name")
    else

      # Check for updated after
      updated_after = 20.years.ago
      updated_after = params[:updated_after].to_datetime unless params[:updated_after].blank?

      @interviews = Interview.select("slug, updated_at, created_at")
                             .where("is_demo = ? AND updated_at > ?", 0, updated_after)
                             .order("updated_at DESC")

      @interviews.map! { |interview|
        # interview = interview.as_json
        interview[:url] = interview_url(interview[:slug], format: :json)
        # interview.except(:image)
        interview
      }
    end

    render json: @interviews
  end

  def demo
    @interviews = Interview.select("annotations, id, image, slug, storyteller_name, summary, url")
                           .where("is_demo = ?", 1)
                           .order("storyteller_name")
    render json: @interviews
  end

  # GET /interviews/1
  # GET /interviews/1.json
  def show
    @interview = Interview.find_by_slug(params[:id])
    @annotations = []
    @annotations = JSON.parse @interview.annotations unless @interview.annotations.blank?
    @annotations = @annotations.select do |a|
      a['text'].present?
    end
    @interview[:neighborhood] = Neighborhood.find_by_id(@interview.neighborhood_id)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @interview }
    end
  end

  # PUT /interviews/1
  # PUT /interviews/1.json
  def update
    @interview = Interview.find_by_slug(params[:id])

    # only allow public to update annotations
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
