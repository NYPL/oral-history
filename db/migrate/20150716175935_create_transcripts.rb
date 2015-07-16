class CreateTranscripts < ActiveRecord::Migration
  def change
    create_table :transcripts do |t|
      t.integer :interview_id, default: 0
      t.string :slug, null: false
      t.text :body

      t.timestamps
    end

    add_index :transcripts, :interview_id
    add_index :transcripts, :slug, unique: true
  end
end
