class RemoveTaskUniqueConstraint < ActiveRecord::Migration[5.2]
  def change
     remove_index :tasks,  name: "index_tasks_on_taskable_type_and_taskable_id_and_name"
  end
end
