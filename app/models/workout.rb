class Workout < ApplicationRecord
    belongs_to :user
    has_many :workout_tags
    has_many :tags, through: :workout_tags
    has_many :comments, dependent: :destroy
end
