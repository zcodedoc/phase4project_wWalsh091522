class CommentsController < ApplicationController
  wrap_parameters false
  # skip_before_action :authorized, only: :create
  # wrap_parameters format: []
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  
    def index
        comments = Comment.all
        render json: comments
    end

    def create
      userstuff =  User.find_by(id: session[:user_id])
      # session[:user_id] = user.id
      comment = Comment.create({user: userstuff, comment: comment_params[:comment], user_id: comment_params[:user_id], workout_id: comment_params[:workout_id] })
      # session[:comment_id] = comment.id
    
      if comment.valid?
        render json: comment, status: :created
      else
        render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # def show
    #   return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    #   comment = Comment.all.find_by(params[:workout_id])
    #   render json: comment
    # end
    
    private
  
    def render_unprocessable_entity(invalid)
      render json:{error: invalid.record.errors}, status: :unprocessable_entity
    end 

    
    def find_comment
        Comment.find(params[:id])
    end
    

    def comment_params
      params.permit(:id, :user_id, :workout_id, :comment)
    end
  
end
