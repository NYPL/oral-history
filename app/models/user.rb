class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:google_oauth2]

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me
  
  # Retrieve user from google access token
  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    data = access_token.info
    user = User.where(:email => data["email"]).first  
    # Create user if not exists
    unless user
      name = data["email"].split("@").first
      name = data["name"] if data["name"]
      user = User.create( 
        name: name, 
        email: data["email"], 
        password: Devise.friendly_token[0,20]
      )
    end
    user
  end

end
