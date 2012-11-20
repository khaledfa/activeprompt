class RemoveResponsesFromPrompts < ActiveRecord::Migration
  def up
    remove_column :prompts, :responses
  end

  def down
    add_column :prompts, :responses, :string
  end
end
