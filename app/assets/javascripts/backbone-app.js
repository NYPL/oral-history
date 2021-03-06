window.app = {
  models: {},
  collections: {},
  views: {},
  routers: {},
  init: function() {
    var csrf_token = $("meta[name='csrf-token']").attr('content');
    // adds the X-CSRF-Token header with each Ajax call
    Backbone.sync = (function(original) {
      return function(method, model, options) {
        options.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', csrf_token);
        };
        original(method, model, options);
      };
    })(Backbone.sync);

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
  },
  csrfToken: $("meta[name='csrf-token']").attr('content')
};

// Define routes
app.routers.MainRouter = Backbone.Router.extend({

  routes: {
    '': 'index',
    'demo': 'demo',
    'neighborhoods/:id': 'neighborhood',
    'annotations/:id/start': 'start',
    'annotations/:id/mark': 'mark',
    'annotations/:id/transcribe': 'transcribe',
    'transcripts/:id/edit': 'editTranscript',
    'transcripts/:id': 'showTranscript'
  },

  index: function(){
    app.views.main = new app.views.BrowseInterviews();
  },

  demo: function(){
    app.views.main = new app.views.BrowseInterviews({neighborhood_id: 'demo'});
  },

  editTranscript: function(id){
    app.views.main = new app.views.EditTranscript();
  },

  mark: function(id){
    var interview = new app.models.Interview({id: id});
    app.views.main = new app.views.MarkInterview({model: interview});
  },

  neighborhood: function(id){
    app.views.main = new app.views.BrowseInterviews({neighborhood_id: id});
  },

  showTranscript: function(id){
    app.views.main = new app.views.ShowTranscript();
  },

  start: function(id){},

  transcribe: function(id){
    var interview = new app.models.Interview({id: id});
    app.views.main = new app.views.TranscribeInterview({model: interview});
  }

});

// Init backbone app
$(document).ready(function(){
  app.init();
});
