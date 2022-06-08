class User < ApplicationRecord
    has_secure_password
    has_many :workouts
    has_many :comments
    validates :username, presence: true
    validates :username, uniqueness: true     
    validates :name, presence: true
    
  def password=(new_password)
    salt = BCrypt::Engine::generate_salt
    self.password_digest = BCrypt::Engine::hash_secret(new_password, salt)
  end

  def authenticate(password)
    salt = password_digest[0..28]
    return nil unless BCrypt::Engine::hash_secret(password, salt) == self.password_digest
    self
  end

end
