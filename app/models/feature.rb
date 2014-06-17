class Feature < ActiveRecord::Base
  attr_accessible :description, :image, :interview_id, :is_active, :title
  
  belongs_to :interview
  
end
