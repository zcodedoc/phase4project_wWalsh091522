class CommentSerializer < ActiveModel::Serializer
  attributes :id, :workout_id, :user_id, :comment
  belongs_to :workout
  belongs_to :user
end
