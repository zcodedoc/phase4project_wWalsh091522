class Tag < ApplicationRecord
    validates :name, presence: true
    validates :name, uniqueness: true
    has_many :workout_tags
    has_many :workouts, through: :workout_tags
end
