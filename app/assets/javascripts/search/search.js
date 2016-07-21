window.app = {
  models: {},
  collections: {},
  views: {},
  routers: {},
  init: function() {
    app.routers.main = new app.routers.MainRouter();
    // Enable pushState for compatible browsers
    var enablePushState = true;
    // Disable for older browsers
    var pushState = !!(enablePushState && window.history && window.history.pushState);
    // Start **Backbone History**
    Backbone.history = Backbone.history || new Backbone.History({});
    Backbone.history.start({
      pushState:pushState
    });
  }
};

// Define routes
app.routers.MainRouter = Backbone.Router.extend({

  routes: {
    'search': 'search',
    'search?*queryString': 'search'
  },

  search: function(queryString){
    var params = {};
    if (queryString) params = deparam(queryString);
    app.views.main = new app.views.Search(params);
  }

});

// Init backbone app
$(document).ready(function(){
  app.init();
});
