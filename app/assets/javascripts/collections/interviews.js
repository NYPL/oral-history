app.collections.Interviews = Backbone.Collection.extend({

  model: app.models.Interview,
  neighborhood_id: null,
  
  url: function(){
    var endpoint = '/interviews.json';
    if (this.neighborhood_id) endpoint += '?neighborhood_id=' + this.neighborhood_id;
    return endpoint;
  },
  
  setNeighborhood: function(neighborhood_id) {
    this.neighborhood_id = neighborhood_id;
  },
  
  toReadOnlyJSON: function(){    
    return _.map(this.models, function(m){ return m.toReadOnlyJSON() });
  }

});
