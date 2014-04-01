require 'test_helper'

class InterviewsControllerTest < ActionController::TestCase
  setup do
    @interview = interviews(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:interviews)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create interview" do
    assert_difference('Interview.count') do
      post :create, interview: { annotations: @interview.annotations, date_of_birth: @interview.date_of_birth, dates_in_location: @interview.dates_in_location, duration: @interview.duration, family_members: @interview.family_members, image: @interview.image, interviewed_at: @interview.interviewed_at, interviewer_name: @interview.interviewer_name, location: @interview.location, notes: @interview.notes, occupations: @interview.occupations, other_locations: @interview.other_locations, place_of_birth: @interview.place_of_birth, slug: @interview.slug, storyteller_name: @interview.storyteller_name, summary: @interview.summary, thumb: @interview.thumb, url: @interview.url, user_id: @interview.user_id }
    end

    assert_redirected_to interview_path(assigns(:interview))
  end

  test "should show interview" do
    get :show, id: @interview
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @interview
    assert_response :success
  end

  test "should update interview" do
    put :update, id: @interview, interview: { annotations: @interview.annotations, date_of_birth: @interview.date_of_birth, dates_in_location: @interview.dates_in_location, duration: @interview.duration, family_members: @interview.family_members, image: @interview.image, interviewed_at: @interview.interviewed_at, interviewer_name: @interview.interviewer_name, location: @interview.location, notes: @interview.notes, occupations: @interview.occupations, other_locations: @interview.other_locations, place_of_birth: @interview.place_of_birth, slug: @interview.slug, storyteller_name: @interview.storyteller_name, summary: @interview.summary, thumb: @interview.thumb, url: @interview.url, user_id: @interview.user_id }
    assert_redirected_to interview_path(assigns(:interview))
  end

  test "should destroy interview" do
    assert_difference('Interview.count', -1) do
      delete :destroy, id: @interview
    end

    assert_redirected_to interviews_path
  end
end
