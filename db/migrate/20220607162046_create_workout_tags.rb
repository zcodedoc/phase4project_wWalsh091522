class CreateWorkoutTags < ActiveRecord::Migration[6.1]
  def change
    create_table :workout_tags do |t|
      t.belongs_to :workout, null: false, foreign_key: true
      t.belongs_to :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
