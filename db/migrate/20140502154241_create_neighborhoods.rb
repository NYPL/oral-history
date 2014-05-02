class CreateNeighborhoods < ActiveRecord::Migration
  def change
    create_table :neighborhoods do |t|
      t.string :slug, null: false
      t.string :title
      t.string :subtitle
      t.text :short_description
      t.text :long_description
      t.text :contact_description
      t.integer :interview_count, default: 0, null: false
      t.string :image
      
      t.timestamps
    end
    add_index :neighborhoods, :slug, unique: true
    add_column :interviews, :neighborhood_id, :integer, default: 1, null: false
    add_index :interviews, :neighborhood_id
  end
end
