class RemoveFirebaseFromPrompts < ActiveRecord::Migration
  def up
    remove_column :prompts, :firebase
  end

  def down
    add_column :prompts, :firebase, :string
  end
end
