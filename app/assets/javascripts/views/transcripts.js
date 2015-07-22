app.views.Transcripts = Backbone.View.extend({

  centerSelected: function(){
    var $part = $('.part.active').first(),
        offset = $part.offset().top,
        height = $part.height(),
        windowHeight = $(window).height(),
        animationDuration = 500,
        timeSinceLastAction = 9999,
        currentTime = +new Date(),
        scrollOffset;

    // determine time since last action to prevent too many queued animations
    if (this.lastCenterActionTime) {
      timeSinceLastAction = currentTime - this.lastCenterActionTime;
    }
    this.lastCenterActionTime = currentTime;

    if (height < windowHeight) {
      scrollOffset = offset - ((windowHeight / 2) - (height / 2));

    } else {
      scrollOffset = offset;
    }

    // user is clicking rapidly; don't animate
    if (timeSinceLastAction < animationDuration) {
      $('html, body').scrollTop(scrollOffset);
    } else {
      $('html, body').animate({scrollTop: scrollOffset}, animationDuration);
    }

  },

  flashMessage: function(message){
    if (this.message_timeout) {
      clearTimeout(this.message_timeout);
    }

    $('.transcript-message').text(message).addClass('active');

    this.message_timeout = setTimeout(function(){
      $('.transcript-message').removeClass('active');
    }, 1500);
  },

  initAll: function(){
    var that = this;

    this.transcript = {};
    this.player = false;

    this.media_loaded = new $.Deferred();
    this.transcript_loaded = new $.Deferred();

    $.when(this.media_loaded, this.transcript_loaded).done(function() {
      that.initUI();
    });

    this.initSoundManager();
    this.initTranscript();
  },

  initPlayer: function(){
    var url = $('#transcript').attr('data-url'),
        fixed_url = helper.matchUrl(url);

    this.player = soundManager.createSound({
      url: fixed_url,
      autoLoad: true,
      autoPlay: false
    });

    this.media_loaded.resolve();
  },

  initSoundManager: function(){
    var that = this;

    soundManager.setup({
      url: 'assets/vendor/',
      flashVersion: 9,
      preferFlash: false,
      onready: function() {
        console.log('SoundManager ready.');
        that.initPlayer();
      }
    });
  },

  initTranscript: function(){
    var that = this,
        url = $('#transcript').attr('data-transcript-url'),
        this_url = window.location.href;

    if (url.length) {
      // make sure protocols match
      var fixed_url = helper.matchUrl(url);

      // retrieve data
      $.getJSON(fixed_url, function(data) {
        console.log('Transcript ready.');
        that.transcript = data.transcript;
        that.transcript_loaded.resolve();
      });
    }
  },

  initUI: function(){
    var that = this,
        $container = $('<div id="parts" class="parts"></div>');

    $.each(this.transcript.parts, function(i, p){
      if (p.text.length > 1) {
        $container.append($('<div id="part-'+p.id+'" class="part" data-start="'+p.start_time+'" data-end="'+p.end_time+'"><div class="time-label">'+helper.formatTime(p.start_time)+'</div><input type="text" value="'+p.text+'" /></div>'));
      }
    });
    $('#transcript').append($container);

    this.onReady();
  },

  logChange: function(action, label, value){
    try { ga && ga('send', 'event', 'transcript', action, label, value); }
    catch(err){}
  },

  onReady: function(){ /* override me */ },

  pause: function(){
    this.player.pause();

    $('.toggle-play-link').removeClass('active');
  },

  paused: function(){
    return this.player.paused || this.player.playState <= 0;
  }

});
