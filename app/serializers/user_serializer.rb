class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :bio, :header, :image
  has_many :workouts
  has_many :comments
end
