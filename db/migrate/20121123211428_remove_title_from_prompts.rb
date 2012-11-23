class RemoveTitleFromPrompts < ActiveRecord::Migration
  def up
    remove_column :prompts, :title
  end

  def down
    add_column :prompts, :title, :string
  end
end
