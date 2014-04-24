app.models.Interview = Backbone.Model.extend({
  
  defaults: function() {
    return {
      id: 0,
      storyteller_name: '',
      annotations: [],
      matched_annotations: []
    };
  },
  
  initialize: function(){},
  
  url: function() {
    return '/interviews/' + this.get('id') + '.json';
  },
  
  parse: function(resp, options) {    
    // no response means successful update
    if (!resp) {
      console.log('Saved.');
      return false;
    }
    var annotations;
    // if this is a collection, just return the parsed json
    if (options.collection){
      annotations = [];
      if ( resp.annotations && resp.annotations.length ) {  
        annotations = $.parseJSON(resp.annotations);
      }
    // otherwise, build the annotations as a backbone collection
    } else {
      annotations = new app.collections.Annotations;
      // convert annotations string to json
      if ( resp.annotations && resp.annotations.length ) {      
        _.each( $.parseJSON(resp.annotations), function( m ) {
          annotations.add(new app.models.Annotation(m));
        });
      }
      console.log('Retrieved interview with '+resp.storyteller_name);
    }
    return {
      annotations: annotations,
      id: resp.id,
      image: resp.image,
      slug: resp.slug,
      storyteller_name: resp.storyteller_name,
      summary: resp.summary,
      url: resp.url      
    };
  },
  
  toJSON: function(){
    var valid_attributes = {};
    // convert annotations json to string
    valid_attributes.annotations = JSON.stringify( this.get('annotations').toJSON() );
    return {
      interview: valid_attributes
    }
  },
  
  toReadOnlyJSON: function(){
    return _.clone( this.attributes );
  }

});
