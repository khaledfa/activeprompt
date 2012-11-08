class CreatePrompts < ActiveRecord::Migration
  def change
    create_table :prompts do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
