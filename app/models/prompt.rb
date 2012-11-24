class Prompt < ActiveRecord::Base
  attr_accessible :teacherUrl, :studentUrl, :image, :text;

  has_attached_file :image ;

  def initialize(params = nil)
    super(params)
    after_initialize
  end
  
  def after_initialize()
    if (!self.teacherUrl) 
      self.teacherUrl = 'T' + (0...4).map{65.+(rand(26)).chr}.join ;
    end
    
    if (!self.studentUrl)
      self.studentUrl = 'S' + (0...4).map{65.+(rand(26)).chr}.join ;
    end
  end
end
