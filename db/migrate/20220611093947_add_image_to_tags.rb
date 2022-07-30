class AddImageToTags < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :image, :string
  end
end
