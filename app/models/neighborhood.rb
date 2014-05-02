class Neighborhood < ActiveRecord::Base
  attr_accessible :contact_description, :image, :long_description, :remote_image_url, :short_description, :slug, :subtitle, :title
  attr_accessor :remote_image_url
  
  has_many :interviews
  
  validates :slug, presence: true
  
  mount_uploader :image, ImageUploader
  
  def to_param
    slug
  end
  
end
