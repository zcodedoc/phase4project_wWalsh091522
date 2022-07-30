class WorkoutTagSerializer < ActiveModel::Serializer
  attributes :id, :workout_id, :tag_id
  belongs_to :workout
  belongs_to :tag
end
