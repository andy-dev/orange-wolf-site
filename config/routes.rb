Rails.application.routes.draw do

  get '/welcome/playground'

  root 'welcome#index'

end