class Interview < ActiveRecord::Base
  attr_accessible :annotations, :date_of_birth, :dates_in_location, :duration, :family_members, :image, :interviewed_at, 
                  :interviewer_name, :location, :notes, :occupations, :other_locations, :place_of_birth, :remote_image_url,
                  :storyteller_name, :summary, :thumb, :url
  attr_accessor :remote_image_url
      
  validates :storyteller_name, presence: true
  
  before_create :make_slug
  
  mount_uploader :image, ImageUploader
  
  
  def to_param
    slug
  end
  
  def make_slug
    self.slug = [self.storyteller_name.parameterize, rand(36**6).to_s(36)].join("-")
  end

end
