OralHistory::Application.routes.draw do

  match 'interviews/demo' => 'interviews#demo'
  
  resources :interviews, :only => [:index, :show, :update]
  resources :neighborhoods, :only => [:index, :show]
  
  match 'admin/annotations/vis' => 'admin/annotations#vis'
  
  namespace :admin do
    resources :interviews, :neighborhoods, :features, :branches, :annotations
  end

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
  match 'admin' => 'admin/interviews#index', :as => :admin
  
  match 'annotations/:id/start' => 'annotations#start', :as => :start
  match 'annotations/:id/mark' => 'annotations#mark', :as => :mark
  match 'annotations/:id/transcribe' => 'annotations#transcribe', :as => :transcribe
  match 'home' => 'home#index'
  match 'demo' => 'neighborhoods#demo'  
    
  root :to => 'home#index'

end
