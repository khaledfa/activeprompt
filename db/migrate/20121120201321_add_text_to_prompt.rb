class AddTextToPrompt < ActiveRecord::Migration
  def change
    add_column :prompts, :text, :string
  end
end
