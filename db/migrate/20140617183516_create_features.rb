class CreateFeatures < ActiveRecord::Migration
  def change
    create_table :features do |t|
      t.integer :interview_id, null: false
      t.string :title
      t.text :description
      t.string :image
      t.integer :is_active

      t.timestamps
    end
    
    add_index :features, :interview_id
    add_column :interviews, :is_demo, :integer, default: 0
    add_column :neighborhoods, :is_featured, :integer, default: 0    
  end
end
