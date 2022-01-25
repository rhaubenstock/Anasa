class RemovingPrjNameIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :projects, name: "index_projects_on_team_id_and_name" 
  end
end
