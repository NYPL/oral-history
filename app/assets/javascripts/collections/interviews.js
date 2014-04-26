app.collections.Interviews = Backbone.Collection.extend({

  model: app.models.Interview,
  
  url: '/interviews.json',
  
  toReadOnlyJSON: function(){    
    return _.map(this.models, function(m){ return m.toReadOnlyJSON() });
  }

});
