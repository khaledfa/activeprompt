class RemoveContentFromPrompt < ActiveRecord::Migration
  def up
    remove_column :prompts, :content
  end

  def down
    add_column :prompts, :content, :string
  end
end
