class Prompt < ActiveRecord::Base
  attr_accessible :content, :title, :firebase, :teacherUrl, :studentUrl

  validates :title, :length => { :minimum => 5 }

  has_many :responses
end
