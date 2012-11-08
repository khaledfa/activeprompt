class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.string :comment
      t.references :prompt

      t.timestamps
    end
    add_index :responses, :prompt_id
  end
end
