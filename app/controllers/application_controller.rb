class ApplicationController < ActionController::API
   
    include ActionController::Cookies
     before_action :authorized
    def authorized
        return render json:{error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
        # unless session.include? :user_id
        #   render json: { error: "Not authorized" }, status: :unauthorized
        # end
      end 
end
