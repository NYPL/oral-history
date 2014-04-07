app.models.Annotation = Backbone.Model.extend({
  
  defaults: function() {
    return {
      id: 0,
      interview_id: 0,
      start: 0,
      end: 0,
      notes: '',
      text: ''   
    };
  },
  
  initialize: function(){
    var id = this.get('id') || helper.makeId(),
        end = this.get('end') || this.get('start') + 2;        
    this.set({
      'id': id,
      'end': end
    })
  },
  
  duration: function(){
    return this.get('end') - this.get('start');
  }
  
});
