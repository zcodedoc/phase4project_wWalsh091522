class WorkoutTagsController < ApplicationController
  wrap_parameters format: []
  

    def index
      workouttags = WorkoutTag.all
      render json: workouttags
    end 

    def show
      workouttag = WorkoutTag.find_by(id: params[:id])
      if workouttag
        render json: workouttag
      else
        render json: { error: "Workout Tag not found" }, status: :not_found
      end
    end

    def create
      workouttag = WorkoutTag.create(workout_id: params[:workout_id], tag_id: params[:tag_id])

      # if workouttag.valid?
        render json: workouttag, status: :created
      # else
      #   render json: { errors: workouttag.errors.full_messages }, status: :unprocessable_entity
      # end
    end

    def update
      # byebug
      workouttag = WorkoutTag.find_by(id: params[:id])
      workouttag.update!(workouttag_params)
      render json: workouttag
    end

    def destroy
      workouttag = WorkoutTag.find_by(id: params[:id])
      workouttag.destroy
      head :no_content
    end

private

    def workouttag_params
      params.permit(:id, :workout_id, :tag_id)
    end  
end
