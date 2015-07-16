class TranscriptsController < ApplicationController

  def show
    @interview = Interview.find_by_slug(params[:id])
    transcript = Transcript.where(interview_id: @interview.id).order("created_at DESC").limit(1).first
    body = {'transcript': {}}
    @transcript_url = @interview.transcript_url

    if transcript
      body = JSON.parse transcript.body
      @transcript_url = "/transcripts/#{@interview.slug}.json"
    end

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: body }
    end
  end

  def edit
    @interview = Interview.find_by_slug(params[:id])
    transcript = Transcript.where(interview_id: @interview.id).order("created_at DESC").limit(1).first
    @transcript_url = @interview.transcript_url
    @transcript_url = "/transcripts/#{@interview.slug}.json" if transcript
  end

  def save
    if params[:body]
      interview = Interview.find_by_slug(params[:id])
      interview_id = interview.slug
      transcript = nil

      if session[interview_id]
        transcript = Transcript.find_by_slug(session[interview_id])
      end

      if transcript
        transcript.update_attributes(:body => params[:body])
        puts "Updated Transcript #{session[interview_id]}"

      else
        transcript = Transcript.create :interview_id => interview.id, :body => params[:body]
        session[interview_id] = transcript.slug
        puts "Created Transcript #{session[interview_id]}"
      end

    end

    head :no_content
  end

end
