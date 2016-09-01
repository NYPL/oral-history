class AddCustomFieldsToInterviews < ActiveRecord::Migration
  def change
    add_column :interviews, :custom_fields, :text, default: ""
    add_column :interviews, :needs_transcript, :integer, default: 0
    add_column :interviews, :has_transcript, :integer, default: 0
  end
end
