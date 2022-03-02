class RemoveTaskUniqueConstraint < ActiveRecord::Migration[5.2]
  def change
    # was originally
    # remove_index :tasks,  name: "index_tasks_on_taskable_type_and_taskable_id_and_name"
    # for some reason in heroku db the order of taskable_id and taskable_type were reversed so I changed it below
     remove_index :tasks,  name: "index_tasks_on_taskable_id_and_taskable_type_and_name"
  end
end
