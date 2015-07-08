NYPL Community Oral History Project
============

This is the codebase that runs [The New York Public Library Community Oral History Project](http://oralhistory.nypl.org/). It provides an interface for: browsing, searching, listening to, annotating, and managing oral history audio files.

## Requirements

1. Ruby (currently on 1.9.3)
2. Rails (currently on 3.2.13)
3. PostgreSQL Database
4. Amazon S3 account (for storing images) - unnecessary for local development
5. Google account (for admin user management) - this is optional if you configure Devise otherwise

## Configuration

1. Create `config/database.yml` based on [config/database.yml.sample](config/database.yml.sample)
2. Create `config/application.yml` based on [config/application.yml.sample](config/application.yml.sample) - contains config variables for Amazon, Google, and Devise
3. Go to [app/uploaders/image_uploader.rb](app/uploaders/image_uploader.rb) to configure your website's image thumbnails
4. Go to [app/controllers/application_controller.rb](app/controllers/application_controller.rb) and find the method `is_admin?` and edit the logic appropriately to determine if user is an admin (can add/edit/delete content)

## Setup

1. In the project's directory, run `bundle install`
2. Run `rake db:create` and `rake db:migrate` to setup the database based on `config/database.yml`
3. Run `rails s` and go to http://localhost:3000 to view the app
4. Go to http://localhost:3000/admin to start adding content to the app-- you will authenticate through Gmail by default.
  - Click *Manage Neighborhoods* -> *Create a new neighborhood* and add a new neighborhood
  - Click *Manage Interviews* -> *Add a new interview* to add new interviews
