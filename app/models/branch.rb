class Branch < ActiveRecord::Base
  attr_accessible :description, :image, :name, :neighborhood_id, :slug
  #attr_accessor :remote_image_url
  
  belongs_to :neighborhood
  has_many :interviews
  
  validates :name, presence: true
  
  before_create :make_slug
  
  #mount_uploader :image, ImageUploader
  
  def to_param
    slug
  end
  
  def make_slug
    self.slug = self.name.parameterize
  end
  
end
