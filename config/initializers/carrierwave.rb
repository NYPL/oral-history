CarrierWave.configure do |config|
  
  config.fog_credentials = {
    :provider               => 'AWS',
    :aws_access_key_id      => ENV["AWS_ACCESS_KEY"],
    :aws_secret_access_key  => ENV["AWS_SECRET_KEY"]
  }
  
  if Rails.env.production?
    config.storage = :fog
  else
    config.storage = :file
  end
  config.cache_dir = "#{Rails.root}/tmp/uploads"
  config.fog_directory    = ENV['S3_IMAGE_BUCKET_NAME']
    
end