app.views.Annotation = Backbone.View.extend({
  
  tagName: 'div',
  className: 'annotation',
  
  events: {
    "click": "selectAndGoToAnnotation"
  },
  
  initialize: function(options){
    this.options = options;
    if (options.parent) this.parent = options.parent;
    this.listenTo(this.model, "change", this.handleChange);
  },
  
  handleChange: function(){
    // id not set, treat as deleted
    if( !this.model.id ) {
      this.$el.remove();
    }
  },
  
  isSelected: function(){
    return this.$el.hasClass('selected');
  },
  
  render: function() {
    var id = this.model.get('id'),
        time_f = helper.formatTime(this.model.get('start'));
    // set identifiers
    this.$el.attr('id', 'annotation-'+id);
    this.$el.attr('data-id', this.model.id);
    this.$el.text(time_f);
    return this;
  },
  
  select: function(){
    if (this.parent) this.parent.deselectAnnotations();
    this.$el.addClass('selected');        
  },
  
  selectAndGoToAnnotation: function(){
    this.select();
    if (this.parent) this.parent.goToAnnotation(this.model);
  }
  
});