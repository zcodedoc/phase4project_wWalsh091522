class TagSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :workout_tags
  has_many :workouts, through: :workout_tags
end
