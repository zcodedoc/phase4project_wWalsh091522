class TagsController < ApplicationController
    def index
      tags = Tag.all
      render json: tags
    end 

    def show
      tag = Tag.find_by(id: params[:id])
      if tag
        render json: tag, methods: [:summary]
      else
        render json: { error: "Tag not found" }, status: :not_found
      end
    end

    def update
      tag = Tag.find_by(id: params[:id])
      tag.update!(tag_params)
      render json: tag
    end

    private

    def tag_params
      params.permit( :id, :name, :image)
    end    
end
