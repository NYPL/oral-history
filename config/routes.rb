OralHistory::Application.routes.draw do

  resources :interviews, :only => [:index, :show, :update]
  resources :neighborhoods, :only => [:index, :show]
  
  namespace :admin do
    resources :interviews, :neighborhoods
  end

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
  match 'admin' => 'admin/interviews#index', :as => :admin
  match 'annotations/:id/start' => 'annotations#start', :as => :start
  match 'annotations/:id/mark' => 'annotations#mark', :as => :mark
  match 'annotations/:id/transcribe' => 'annotations#transcribe', :as => :transcribe
    
  root :to => 'neighborhoods#index'

end
