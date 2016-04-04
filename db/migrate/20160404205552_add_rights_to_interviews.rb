class AddRightsToInterviews < ActiveRecord::Migration
  def change
    add_column :interviews, :rights_statement, :text, default: ""
  end
end
