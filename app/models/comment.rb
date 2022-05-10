class Comment < ApplicationRecord
    validates :comment, presence: true
    belongs_to :workout
    belongs_to :user
end
