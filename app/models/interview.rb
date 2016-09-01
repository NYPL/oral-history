class Interview < ActiveRecord::Base
  attr_accessible :annotations, :date_of_birth, :dates_in_location, :duration, :family_members, :image, :interviewed_at,
                  :interviewer_name, :location, :neighborhood_id, :notes, :occupations, :other_locations, :place_of_birth, :remote_image_url,
                  :storyteller_name, :summary, :thumb, :url, :is_demo, :branch_id, :transcript_url, :rights_statement,
                  :custom_fields, :needs_transcript
  attr_accessor :remote_image_url

  belongs_to :neighborhood
  belongs_to :branch

  has_many :features
  has_many :transcripts

  validates :storyteller_name, :url, presence: true

  before_create :make_slug

  mount_uploader :image, ImageUploader

  self.per_page = 100

  def to_param
    slug
  end

  def make_slug
    self.slug = [self.storyteller_name.parameterize, rand(36**6).to_s(36)].join("-")
  end

end
