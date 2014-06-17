require 'test_helper'

class FeaturesControllerTest < ActionController::TestCase
  setup do
    @feature = features(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:features)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create feature" do
    assert_difference('Feature.count') do
      post :create, feature: { description: @feature.description, image: @feature.image, interview_id: @feature.interview_id, is_active: @feature.is_active, title: @feature.title }
    end

    assert_redirected_to feature_path(assigns(:feature))
  end

  test "should show feature" do
    get :show, id: @feature
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @feature
    assert_response :success
  end

  test "should update feature" do
    put :update, id: @feature, feature: { description: @feature.description, image: @feature.image, interview_id: @feature.interview_id, is_active: @feature.is_active, title: @feature.title }
    assert_redirected_to feature_path(assigns(:feature))
  end

  test "should destroy feature" do
    assert_difference('Feature.count', -1) do
      delete :destroy, id: @feature
    end

    assert_redirected_to features_path
  end
end
