class WorkoutsController < ApplicationController
    wrap_parameters false
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    before_action :authorize


    def index        
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
      workouts = Workout.all.includes(:user).order("created_at ASC")
      puts json: workouts
      puts json: workouts.to_a
      render json: workouts, include: :comments
    end
    
    def create
      userstuff =  User.find_by(id: session[:user_id])
        workout = Workout.create({user: userstuff, title: workout_params[:title], description: workout_params[:description], image: workout_params[:image], sets: workout_params[:sets], reps: workout_params[:reps], weight: workout_params[:weight],  })
        puts session[:user_id]
        if workout.valid?
          render json: workout, status: :created
        else
          render json: { errors: workout.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
      workout = find_workout_update
      workout.update(workout_params)
      render json: workout
    end

    def increment_likes
      workout = Workout.find(params[:id])
      if workout 
        puts params
        workout.update(likes: params[:likes])
        render json: workout
      else 
        render json: { error: "Workout not found" }, status: :not_found
      end
    end

    def destroy
        workout = find_workout
        puts workout.id
        workout.destroy
        head :no_content
    end
        
    private
  
    def find_workout
      Workout.find(params[:id])
    end

     def find_workout_update
        Workout.find(params[:id])
     end

     def workout_params
        params.permit(:id, :title, :description, :image, :sets, :reps, :weight, :likes, :user_id)
     end
  
    def authorize
        puts session[:workout_id]
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
      end
      
    def record_not_found
        render json: { error: "Workout not found" }, status: :not_found
    end
  
end
  

