class AddMoreUrlsToPrompts < ActiveRecord::Migration
  def change
    add_column :prompts, :teacherUrl, :string
    add_column :prompts, :studentUrl, :string
  end
end
