class Response < ActiveRecord::Base
  belongs_to :prompt
  attr_accessible :comment
end
