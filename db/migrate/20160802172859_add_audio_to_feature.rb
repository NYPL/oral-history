class AddAudioToFeature < ActiveRecord::Migration
  def change
    add_column :features, :audio_url, :string, null: false, default: ""
  end
end
