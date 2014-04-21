(function() {
  var Player;

  Player = (function() {
    function Player(options) {
      var defaults = {
        debug: false
      };
      this.options = $.extend(defaults, options);
      this.init();      
    }   
    
    Player.prototype.init = function(){
      this.initStartTime(); 
      this.initPlayers();
      this.initListeners();
    };
    
    Player.prototype.initListeners = function(){
      var that = this;
      
      $('.player-load-button').on('click',function(e){
        e.preventDefault();
        var id = $(this).attr('href').slice(1);
        $(this).closest('.player-placeholder').hide();
        that.initPlayer(id, true);
      });
      
      $('.seek-to').on('click',function(e){
        e.preventDefault();
        that.seekToFromLink($(this));
      });
    };
    
    Player.prototype.initPlayers = function(){
      var that = this;
  
      // hash of players
      this.players = {};
      this.active_player_id = null;      
      
      $('audio.auto-load').each(function(i){
        var id = $(this).attr('id');
        that.initPlayer(id, false);
        if (i===0) that.active_player_id = id;
      });
    };
    
    Player.prototype.initPlayer = function(id, autoplay){
      if (this.players[id]) return false;
          
      console.log('Initializing interview '+id);     
      
      var that = this,
          features = ['playpause','progress'];
          
      // check if we should show duration
      if ( $('#'+id).attr('data-show-duration')==='true' ) {
        features.push('current', 'duration');
      }
      
      // create mediaelement object and play onsuccess
      this.players[id] = new MediaElementPlayer('#'+id, {
        features: features,
        success: function(media, originalNode) {
          console.log('Loaded player '+id);
          
          // add listener on play
          media.addEventListener('play', function(e) {
            that.onPlay(id, media);         
          }, false);
          
          // add listener on loadeddata
          media.addEventListener('loadeddata', function(e) {              
            // set start time
            if (that.start_time) {
              console.log('Setting start time to '+that.start_time+'s');
              media.setCurrentTime(that.start_time);
            }
            // play if autoplay
            if (autoplay) {
              media.play();
            }                
          }, false);         
           
        }
      });
    };
    
    Player.prototype.initStartTime = function(){
      this.start_time = null;
      if(window.location.hash) {
        var hash = window.location.hash.substring(1);  
        this.start_time = helper.getSeconds(hash);
      }
    };
    
    Player.prototype.onPlay = function(id, media){      
      // pause previously active player
      if ( this.active_player_id && this.active_player_id != id ) {
        this.players[this.active_player_id].pause();
      }      
      
      // set new active player
      this.active_player_id = id;
    };
    
    Player.prototype.seekTo = function(s){
      console.log('Seeking to '+s+'s');
      if (this.active_player_id) this.players[this.active_player_id].setCurrentTime(s);
    };
    
    Player.prototype.seekToFromLink = function($link){      
      var seconds = parseInt($link.attr('data-seconds'));      
      this.seekTo(seconds);
      window.location.hash = '#' + helper.formatTime(seconds);
    };

    return Player;

  })();
  
  

  $(function() {
    return new Player({});
  });

}).call(this);
