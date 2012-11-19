class AddFirebaseIdToPrompts < ActiveRecord::Migration
  def change
    add_column :prompts, :firebase, :string
  end
end
