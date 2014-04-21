module InterviewsHelper
  
  def seconds_to_string(seconds)
    if seconds < 60*60
      Time.at(seconds).utc.strftime("%M:%S")
    else
      Time.at(seconds).utc.strftime("%H:%M:%S")
    end    
  end
  
end
