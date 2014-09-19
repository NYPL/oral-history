#encoding: utf-8

namespace :db do
  desc "Create Neighborhood Branches"  
  task :create_branches => :environment do
    # Retrieve neighborhoods
    neighborhood_greenwich_village = Neighborhood.find_by_slug('greenwich-village')
    neighborhood_harlem = Neighborhood.find_by_slug('harlem')
    
    # Remove all branches
    Branch.delete_all
    
    # Create Branches
    Branch.create! :name => 'Jefferson Market', :neighborhood_id => neighborhood_greenwich_village.id          
    Branch.create! :name => '115th Street', :neighborhood_id => neighborhood_harlem.id
    Branch.create! :name => "Macomb's Bridge", :neighborhood_id => neighborhood_harlem.id
    Branch.create! :name => 'Countee Cullen', :neighborhood_id => neighborhood_harlem.id
    Branch.create! :name => 'George Bruce', :neighborhood_id => neighborhood_harlem.id
    Branch.create! :name => 'Hamilton Grange', :neighborhood_id => neighborhood_harlem.id
  end
  
  desc "Assign Default Neighborhood Branches To Interviews"  
  task :assign_branches => :environment do
    # Retrieve neighborhoods
    neighborhood_greenwich_village = Neighborhood.find_by_slug('greenwich-village')
    neighborhood_harlem = Neighborhood.find_by_slug('harlem')
    
    # Retrieve Default Branches
    branch_jefferson_market = Branch.find_by_slug('jefferson-market')          
    branch_115th_street = Branch.find_by_slug('115th-street')
    
    # Assign Branches to interviews
    Interview.where(:neighborhood_id => neighborhood_greenwich_village.id).update_all(:branch_id => branch_jefferson_market.id)
    Interview.where(:neighborhood_id => neighborhood_harlem.id).update_all(:branch_id => branch_115th_street.id)    
  end
end