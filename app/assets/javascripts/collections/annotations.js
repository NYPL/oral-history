app.collections.Annotations = Backbone.Collection.extend({

  model: app.models.Annotation,
  
  /* sort by start */
  comparator: function( a, b ){
    var a_start = a.get('start'), 
        b_start = b.get('start');
    // a happens earlier than b
    if ( a_start < b_start ) {
      return -1;
    // a happens later than b
    } else if ( a_start > b_start ) {
      return 1;
    // a happens at same time as b
    } else {
      return 0;
    }
  }

});
