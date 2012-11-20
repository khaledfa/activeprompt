class Prompt < ActiveRecord::Base
  attr_accessible :content, :title, :firebase, :teacherUrl, :studentUrl, :image

  validates :title, :length => { :minimum => 5 }
  
  has_attached_file :image 

end
