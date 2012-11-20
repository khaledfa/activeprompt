class AddAttachmentImageToPrompts < ActiveRecord::Migration
  def self.up
    change_table :prompts do |t|
      t.has_attached_file :image
    end
  end

  def self.down
    drop_attached_file :prompts, :image
  end
end
