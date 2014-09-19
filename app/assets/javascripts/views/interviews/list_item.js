app.views.InterviewListItem = Backbone.View.extend({
  
  tagName: 'li',
  
  template: JST['interview_list_item'],
  
  initialize: function(options){
    this.options = options;
  },
  
  render: function() {
    this.$el.attr('title',this.model.get('storyteller_name'));
    this.$el.attr('data-branch-id', this.model.get('branch_id'));
    this.$el.html(this.template(this.model.toReadOnlyJSON()));
    return this;
  }
  
});