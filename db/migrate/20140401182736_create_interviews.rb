class CreateInterviews < ActiveRecord::Migration
  def change
    create_table :interviews do |t|
      t.string :slug, null: false
      t.integer :user_id, default: 0, null: false
      t.string :interviewer_name, default: "", null: false
      t.datetime :interviewed_at
      t.string :location
      t.string :storyteller_name, default: "", null: false
      t.datetime :date_of_birth
      t.string :place_of_birth
      t.text :occupations
      t.text :dates_in_location
      t.text :other_locations
      t.text :family_members
      t.text :notes
      t.text :summary
      t.string :url
      t.integer :duration, default: 0, null: false
      t.string :image
      t.string :thumb
      t.text :annotations

      t.timestamps
    end
    add_index :interviews, :slug, unique: true
    add_index :interviews, :user_id
  end
end
