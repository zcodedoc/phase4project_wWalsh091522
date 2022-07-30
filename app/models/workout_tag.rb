class WorkoutTag < ApplicationRecord
  belongs_to :workout
  belongs_to :tag
end
