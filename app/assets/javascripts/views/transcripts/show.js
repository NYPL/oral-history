app.views.ShowTranscript = app.views.Transcripts.extend({

  el: 'body',

  events: {
    "click .toggle-play-link": "togglePlay"
  },

  initialize: function(){
    this.active_i = 0;

    this.initAll();
  },

  initKeys: function(){
    var that = this;
    $(window).keydown(function(e){
      switch( e.keyCode ) {
        case 32: // space
          e.preventDefault();
          that.togglePlay();
          break;
      }
    });
  },

  onProgress: function(position){
    var current_time = position,
        active_i = -1;

    _.each(this.transcript.parts, function(p, i){
      if (current_time >= parseFloat(p.start_time) && current_time < parseFloat(p.end_time)) {
        active_i = i;
      } else {
        return false;
      }
    });

    if (active_i != this.active_i && active_i >= 0) {
      this.active_i = active_i;
      $('.part').removeClass('active');
      $('#parts .part').eq(this.active_i).addClass('active');
      this.centerSelected();
    }
  },

  onReady: function(){
    var that = this;

    this.initKeys();

    $('#transcript').on('click', '.part', function(e){
      e.preventDefault();
      e.stopPropagation();
      var start_time = parseFloat($(this).attr('data-start'));
      that.setPosition(start_time);
    });

    $('#parts .part').first().addClass('active');
    this.centerSelected();
    this.play();
  },

  play: function(){
    var that = this;

    this.player.play({
      whileplaying: function(){
        that.onProgress(this.position/1000);
      }
    });

    $('.toggle-play-link').addClass('active');
  },

  setPosition: function(position){
    var paused = this.paused();

    if (!paused) {
      this.pause();
    }

    this.player.setPosition(position*1000);
    this.onProgress(position);

    if (!paused) {
      this.play();
    }
  }

});
