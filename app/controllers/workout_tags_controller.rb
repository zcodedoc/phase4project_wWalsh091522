class WorkoutTagsController < ApplicationController
  wrap_parameters format: []
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  
    def index
      workouttags = WorkoutTag.all
      render json: workouttags
    end 

    def show
      workouttag = find_workouttag
      render json: workouttag
    end

    def create
      workouttag = WorkoutTag.create(workout_id: params[:workout_id], tag_id: params[:tag_id])
      render json: workouttag, status: :created
    end

    def update
      workouttag = find_workouttag
      workouttag.update!(workouttag_params)
      render json: workouttag
    end

    def destroy
      workouttag = find_workouttag
      workouttag.destroy
      head :no_content
    end

private

    def find_workouttag
      WorkoutTag.find(params[:id])
    end

    def workouttag_params
      params.permit(:id, :workout_id, :tag_id)
    end 

    def record_not_found 
      render json: {error: "Workout Tag not found"}, status: :not_found
    end 
end
