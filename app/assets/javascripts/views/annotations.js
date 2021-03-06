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
    this.updateLabel();
    // id not set, treat as deleted
    if( !this.model.id ) {
      this.$el.remove();
    }    
  },
  
  isSelected: function(){
    return this.$el.hasClass('selected');
  },
  
  render: function() {
    var id = this.model.get('id');
    // set identifiers
    this.$el.attr('id', 'annotation-'+id);
    this.$el.attr('data-id', this.model.id);
    this.updateLabel();
    return this;
  },
  
  select: function(){
    if (this.parent) this.parent.deselectAnnotations();
    this.$el.addClass('selected');        
  },
  
  selectAndGoToAnnotation: function(){
    this.select();
    $('.delete-selected').addClass('active');
    if (this.parent) this.parent.goToAnnotation(this.model, true);
  },
  
  updateLabel: function(){
    var time_f = helper.formatTime(this.model.get('start')),
        text = this.model.get('text'),
        label = time_f;
    if ( text && text.length )  label = text + ' ('+time_f+')';
    this.$el.text(label);
  }
  
});