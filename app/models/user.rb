class User < ApplicationRecord
    has_secure_password
    has_many :workouts
    has_many :comments
    validates :username, presence: true
    validates :username, uniqueness: true     
    validates :name, presence: true
end
