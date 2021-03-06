# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20160901152500) do

  create_table "branches", :force => true do |t|
    t.integer  "neighborhood_id", :default => 0
    t.string   "slug"
    t.string   "name"
    t.text     "description"
    t.string   "image"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  add_index "branches", ["neighborhood_id"], :name => "index_branches_on_neighborhood_id"
  add_index "branches", ["slug"], :name => "index_branches_on_slug", :unique => true

  create_table "features", :force => true do |t|
    t.integer  "interview_id",                 :null => false
    t.string   "title"
    t.text     "description"
    t.string   "image"
    t.integer  "is_active"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.string   "audio_url",    :default => "", :null => false
  end

  add_index "features", ["interview_id"], :name => "index_features_on_interview_id"

  create_table "interviews", :force => true do |t|
    t.string   "slug",                              :null => false
    t.integer  "user_id",           :default => 0,  :null => false
    t.string   "interviewer_name",  :default => "", :null => false
    t.datetime "interviewed_at"
    t.string   "location"
    t.string   "storyteller_name",  :default => "", :null => false
    t.datetime "date_of_birth"
    t.string   "place_of_birth"
    t.text     "occupations"
    t.text     "dates_in_location"
    t.text     "other_locations"
    t.text     "family_members"
    t.text     "notes"
    t.text     "summary"
    t.string   "url"
    t.integer  "duration",          :default => 0,  :null => false
    t.string   "image"
    t.string   "thumb"
    t.text     "annotations"
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
    t.integer  "neighborhood_id",   :default => 1,  :null => false
    t.integer  "is_demo",           :default => 0
    t.integer  "branch_id",         :default => 0
    t.string   "transcript_url",    :default => ""
    t.text     "rights_statement",  :default => ""
    t.text     "custom_fields",     :default => ""
    t.integer  "needs_transcript",  :default => 0
    t.integer  "has_transcript",    :default => 0
  end

  add_index "interviews", ["neighborhood_id"], :name => "index_interviews_on_neighborhood_id"
  add_index "interviews", ["slug"], :name => "index_interviews_on_slug", :unique => true
  add_index "interviews", ["user_id"], :name => "index_interviews_on_user_id"

  create_table "neighborhoods", :force => true do |t|
    t.string   "slug",                               :null => false
    t.string   "title"
    t.string   "subtitle"
    t.text     "short_description"
    t.text     "long_description"
    t.text     "contact_description"
    t.integer  "interview_count",     :default => 0, :null => false
    t.string   "image"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.integer  "is_featured",         :default => 0
  end

  add_index "neighborhoods", ["slug"], :name => "index_neighborhoods_on_slug", :unique => true

  create_table "transcripts", :force => true do |t|
    t.integer  "interview_id", :default => 0
    t.string   "slug",                        :null => false
    t.text     "body"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
  end

  add_index "transcripts", ["interview_id"], :name => "index_transcripts_on_interview_id"
  add_index "transcripts", ["slug"], :name => "index_transcripts_on_slug", :unique => true

  create_table "users", :force => true do |t|
    t.string   "name",                   :default => "", :null => false
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0,  :null => false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
