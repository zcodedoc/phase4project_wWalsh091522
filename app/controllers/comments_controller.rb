class CommentsController < ApplicationController
  wrap_parameters format: []
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  
    def index
      comments = Comment.all
      render json: comments
    end

    def create
      userstuff =  User.find_by(id: session[:user_id])
      comment = Comment.create({user: userstuff, comment: comment_params[:comment], user_id: comment_params[:user_id], workout_id: comment_params[:workout_id] })
      if comment.valid?
        render json: comment, status: :created
      else
        render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def show
      comment = find_comment
      if comment
        render json: comment
      else
        render json: { error: "Comment not found" }, status: :not_found
      end
    end

    def destroy
      comment = find_comment
        if comment 
          comment.destroy
          head :no_content
        else 
          render json:  { error: "Comment not found" }, status: :not_found
        end
    end

    private
  
    def render_unprocessable_entity(invalid)
      render json:{error: invalid.record.errors}, status: :unprocessable_entity
    end 

    def find_comment
      Comment.find_by(id: params[:id])
    end
    
    def comment_params
      params.permit(:id, :user_id, :workout_id, :comment)
    end
  
end
