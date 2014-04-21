class Admin::InterviewsController < ApplicationController
  
  before_filter :authenticate_admin!
  
  layout "simple"
  
  # GET /admin/interviews
  # GET /admin/interviews.json
  def index
    @interviews = Interview.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @interviews }
    end
  end

  # GET /admin/interviews/1
  # GET /admin/interviews/1.json
  def show
    @interview = Interview.find_by_slug(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @interview }
    end
  end

  # GET /admin/interviews/new
  # GET /admin/interviews/new.json
  def new
    @interview = Interview.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @interview }
    end
  end

  # GET /admin/interviews/1/edit
  def edit
    @interview = Interview.find_by_slug(params[:id])
  end

  # POST /admin/interviews
  # POST /admin/interviews.json
  def create
    @interview = Interview.new(params[:interview])
    
    @interview.user_id = current_user.id

    respond_to do |format|
      if @interview.save
        format.html { redirect_to admin_interviews_path, notice: 'Interview was successfully created.' }
        format.json { render json: @interview, status: :created, location: @interview }
      else
        format.html { render action: "new" }
        format.json { render json: @interview.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /admin/interviews/1
  # PUT /admin/interviews/1.json
  def update
    @interview = Interview.find_by_slug(params[:id])

    respond_to do |format|
      if @interview.update_attributes(params[:interview])
        format.html { redirect_to admin_interviews_path, notice: 'Interview was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @interview.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/interviews/1
  # DELETE /admin/interviews/1.json
  def destroy
    @interview = Interview.find_by_slug(params[:id])
    @interview.destroy

    respond_to do |format|
      format.html { redirect_to admin_interviews_path, notice: 'Interview was successfully deleted.' }
      format.json { head :no_content }
    end
  end
end
