class Prompt < ActiveRecord::Base
  attr_accessible :title, :firebase, :teacherUrl, :studentUrl, :image, :text

  validates :title, :length => { :minimum => 5 }
  
  has_attached_file :image 

end
