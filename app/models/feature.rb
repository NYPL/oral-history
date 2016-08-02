class Feature < ActiveRecord::Base
  attr_accessible :description, :image, :interview_id, :is_active, :title, :audio_url

  belongs_to :interview

end
