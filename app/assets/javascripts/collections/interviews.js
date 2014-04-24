app.collections.Interviews = Backbone.Collection.extend({

  model: app.models.Interview,
  
  url: '/interviews.json'

});
