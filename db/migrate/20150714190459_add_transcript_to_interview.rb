class AddTranscriptToInterview < ActiveRecord::Migration
  def change
    add_column :interviews, :transcript_url, :string, default: ""
  end
end
