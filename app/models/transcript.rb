class Transcript < ActiveRecord::Base
  attr_accessible :body, :interview_id

  belongs_to :interview

  before_create :make_slug

  def to_param
    slug
  end

  def make_slug
    self.slug = rand(36**6).to_s(36)
  end

end
