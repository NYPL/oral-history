app.views.ShowTranscript = app.views.Transcripts.extend({

  el: '#transcript',

  events: {
    "click .toggle-play": "togglePlay"
  },

  initialize: function(){
    this.initAll();
  },

  onReady: function(){
    $('#parts .part').first().addClass('active');
    this.centerSelected();
  },

  togglePlay: function(e){

  }

});
