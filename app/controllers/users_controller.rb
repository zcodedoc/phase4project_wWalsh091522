class UsersController < ApplicationController
  skip_before_action :authorized, only: :create
  wrap_parameters format: []
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  
    def index
        users = User.all
        render json: users
    end
    
    def create
      user = User.create!(user_params)
      # if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
      # else
      #   render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      # end
    end
      
    def show
      user = User.find_by(id: session[:user_id])
      if user
        render json: user
      else
        render json: { error: "Not authorized" }, status: :unauthorized
      end
    end
        
    private
      
    def render_unprocessable_entity(invalid)
      render json:{error: invalid.record.errors}, status: :unprocessable_entity
    end 
    
        
    def find_user
        User.find(params[:id])
    end
        

    def user_params
      params.permit( :username, :password, :password_confirmation, :name, :bio, :header, :image)
    end    
end
