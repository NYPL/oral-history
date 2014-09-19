class Admin::BranchesController < ApplicationController
  
  before_filter :authenticate_admin!
  
  layout "simple"
  
  # GET /branches
  # GET /branches.json
  def index
    @branches = Branch.order("name")

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @branches }
    end
  end

  # GET /branches/1
  # GET /branches/1.json
  def show
    @branch = Branch.find_by_slug(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @branch }
    end
  end

  # GET /branches/new
  # GET /branches/new.json
  def new
    @branch = Branch.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @branch }
    end
  end

  # GET /branches/1/edit
  def edit
    @branch = Branch.find_by_slug(params[:id])
  end

  # POST /branches
  # POST /branches.json
  def create
    @branch = Branch.new(params[:branch])

    respond_to do |format|
      if @branch.save
        format.html { redirect_to admin_branches_path, notice: 'Branch was successfully created.' }
        format.json { render json: @branch, status: :created, location: @branch }
      else
        format.html { render action: "new" }
        format.json { render json: @branch.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /branches/1
  # PUT /branches/1.json
  def update
    @branch = Branch.find_by_slug(params[:id])

    respond_to do |format|
      if @branch.update_attributes(params[:branch])
        format.html { redirect_to admin_branches_path, notice: 'Branch was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @branch.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /branches/1
  # DELETE /branches/1.json
  def destroy
    @branch = Branch.find_by_slug(params[:id])
    @branch.destroy

    respond_to do |format|
      format.html { redirect_to branches_url }
      format.json { head :no_content }
    end
  end
end
