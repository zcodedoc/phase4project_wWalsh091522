class TagsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index
      tags = Tag.all
      render json: tags
    end 

    def show
      tag = find_tag
      render json: tag, methods: [:summary]
    end

    private

    def find_tag 
      Tag.find(params[:id])
    end 

    def tag_params
      params.permit( :id, :name, :image)
    end 

    def record_not_found 
      render json: { error: "Tag not found" }, status: :not_found
    end
end
