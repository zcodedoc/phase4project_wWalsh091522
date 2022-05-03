class AddLikesToWorkout < ActiveRecord::Migration[6.1]
  def change
    add_column :workouts, :likes, :integer, null: false, default: 0
  end
end
