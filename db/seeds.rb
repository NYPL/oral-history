
# Seed Features
features = [{
  interview_id: 'charlsie-bodie-les3dt',
  audio_url: 'https://s3.amazonaws.com/oral-history/excerpts/Charlsie_Bodie_MeetingExcerpt.mp3',
  title: '"The Apollo Theater Was My Second Home"',
  description: 'Eighty-six year old Charlsie Bodie has always believed in having fun. Here she describes dancing at Harlem\'s Savoy Ballroom and attending amateur hours at the Apollo Theater.'
},{
  interview_id: 'chris-billias-uo5g3f',
  audio_url:'https://s3.amazonaws.com/oral-history/excerpts/Chris_Billias_SoundCloud.mp3',
  title: '"Everything Was a Nickel in Those Days"',
  description: 'As a teenager, Chris Billias never let a lack of money deter him from exploring New York City, especially Greenwich Village, the place to be in the 1960s.'
},{
  interview_id: 'sharon-delugoff-k2fxp3',
  audio_url:'https://s3.amazonaws.com/oral-history/excerpts/Delugoff_Sharon_SoundCloud.mp3',
  title: '"There Was No Place Like the Village Gate"',
  description: 'From the 1950s until its closing in 1994, The Village Gate was known for the quality of the performers it attracted. Here, Sharon D\'Lugoff describes what it was like working with her parents, the owners of this historic nightclub.'
},{
  interview_id: 'frank-senior-6178dq',
  audio_url:'https://s3.amazonaws.com/oral-history/excerpts/Frank_Senior_SoundCloud.mp3',
  title: '"Use Your Nose, Man"',
  description: 'Legally blind Frank Senior discovered that his sense of smell and his hearing were valuable tools when he was first learning how to get around New York City with his cane.'
},{
  interview_id: 'kenneth-daniels-37vhrc',
  audio_url:'https://s3.amazonaws.com/oral-history/excerpts/Kenneth_Daniels_Soundcloud.mp3',
  title: '"It Was One of the Best Projects in Harlem"',
  description: 'Kenneth Daniels remembers growing up in Harlem\'s Lincoln Projects, a close-knit community where everybody knew everybody.'
},{
  interview_id: 'michael-urgo-xmp7gh',
  audio_url:'https://s3.amazonaws.com/oral-history/excerpts/Michael_Urgo_Soundcloud.mp3',
  title: '"I Opened It Up on a Shoestring"',
  description: 'Michael Urgo fondly recalls how his first business venture — a sausage stand at a street fair — quickly grew into a family business when it showed signs of making a profit.'
},{
  interview_id: 'nooria-nodrat-1m2nxn',
  audio_url:'https://s3.amazonaws.com/oral-history/excerpts/Nooria_Nodrat_SoundCloud.mp3',
  title: '"I Became Blind Overnight"',
  description: 'After a random attack by a drug addict on New York City\'s subway system, political refugee Nooria Nodrat lost her eyesight. Here, she describes the moment she realized she was totally blind — and why she decided to forgive her attacker.'
},{
  interview_id: 'vincent-prezioso-18b2gi',
  audio_url:'https://s3.amazonaws.com/oral-history/excerpts/Prezioso_SoundCloud.mp3',
  title: '"It Was All Open Land"',
  description: 'Long-time Bronx resident Vincent Prezioso remembers when the Bronx still had working farms where he and his mother often picked vegetables, and payments were made on the honor system.'
}]
features.each do |attributes|
  interview = Interview.find_by_slug(attributes[:interview_id])
  if interview
    attributes[:is_active] = 1
    attributes[:interview_id] = interview.id
    feature = Feature.find_by_interview_id(interview.id)
    if feature
      feature.update(attributes)
    else
      Feature.create(attributes)
    end


  end
end
