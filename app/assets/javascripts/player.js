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
      })
    };
    
    Player.prototype.initPlayers = function(){
      var that = this;
  
      // hash of players
      this.players = {};
      this.active_player_id = null;
      
      $('audio.auto-load').each(function(){
        var id = $(this).attr('id');
        that.initPlayer(id, false);
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
          
          // add listener onplay
          media.addEventListener('play', function(e) {
            that.onPlay(id, media);         
          }, false);
          
          // play if autoplay
          if (autoplay) {
            media.play();
          }  
        }
      });
    };
    
    Player.prototype.onPlay = function(id, media){      
      // pause previously active player
      if ( this.active_player_id && this.active_player_id != id ) {
        this.players[this.active_player_id].pause();
      }      
      
      // set new active player
      this.active_player_id = id;
    };

    return Player;

  })();
  
  

  $(function() {
    return new Player({});
  });

}).call(this);
