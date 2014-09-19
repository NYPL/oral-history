class CreateBranches < ActiveRecord::Migration
  def change
    create_table :branches do |t|
      t.integer :neighborhood_id, default: 0
      t.string :slug
      t.string :name
      t.text :description
      t.string :image

      t.timestamps
    end
    
    add_index :branches, :neighborhood_id
    add_index :branches, :slug, unique: true
    add_column :interviews, :branch_id, :integer, default: 0
  end
end
