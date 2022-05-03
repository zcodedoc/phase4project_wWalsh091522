class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image, :sets, :reps, :weight, :likes
  belongs_to :user
  has_many :comments
end
