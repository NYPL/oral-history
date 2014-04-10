app.models.Interview = Backbone.Model.extend({
  
  defaults: function() {
    return {
      id: 0,
      name: '',
      annotations: []
    };
  },
  
  initialize: function(){
    var annotations = new app.collections.Annotations;
    if ( !this.get('annotations').length )
      this.set('annotations',annotations);
  },
  
  url: function() {
    return '/interviews/' + this.get('id') + '.json';
  },
  
  parse: function(resp) {
    // no response means successful update
    if (!resp) {
      console.log('Saved.');
      return false;
    }
    var annotations = new app.collections.Annotations;
    // convert annotations string to json
    if ( resp.annotations && resp.annotations.length ) {      
      _.each( $.parseJSON(resp.annotations), function( m ) {
        annotations.add(new app.models.Annotation(m));
      });
    }
    console.log('Retrieved interview '+resp.slug);
    return {
      name: resp.storyteller_name,
      annotations: annotations
    };
  },
  
  toJSON: function(){
    var valid_attributes = {};
    // convert annotations json to string
    valid_attributes.annotations = JSON.stringify( this.get('annotations').toJSON() );
    return {
      interview: valid_attributes
    }
  }

});
