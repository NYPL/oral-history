(function() {
  var Home;

  Home = (function() {
    function Home(options) {
      var defaults = {
        debug: false
      };
      this.options = $.extend(defaults, options);
      this.init();
    }

    Home.prototype.init = function(){
      var _this = this;

      this.ctxs = {};

      this.stickyHeader();
      this.loadListeners();

      $('.scroll-to').on('click', function(e){
        e.preventDefault();
        _this.scrollTo($(this).attr('href'));
      });
    };

    Home.prototype.loadListeners = function(){
      var _this = this;

      $(window).on('player-load', function(e, id, player){
        // add listener on play
        player.addEventListener('timeupdate', function(e) {
          _this.onTimeUpdate(id, player.currentTime/player.duration);
        }, false);
      });
    };

    Home.prototype.onTimeUpdate = function(id, percent){
      if (!this.ctxs[id]) {
        var $status = $('.status[audio-id="'+id+'"]');
        var $canvas = $status.find('.progress');
        var canvas = $canvas[0];
        this.ctxs[id] = canvas.getContext("2d");
        canvas.width = $canvas.width();
        canvas.height = $canvas.width();
      }

      var ctx = this.ctxs[id];
      var canvas = ctx.canvas;
      var $canvas = $(ctx.canvas);
      var w = $canvas.width();
      var r = w / 2;
      var rad = percent*2*Math.PI - Math.PI/2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(r, r, r-10, -Math.PI/2, rad);
      ctx.strokeStyle = "rgba(232,228,226,0.5)";
      ctx.lineWidth = 20;
      ctx.stroke();
      // ctx.fill();
    };

    Home.prototype.scrollTo = function(el, offset){
      var $el = $(el);
      offset = offset || $('#header').height() || 0;

      $('html, body').animate({
          scrollTop: $el.offset().top - offset
      }, 2000);
    };

    Home.prototype.stickyHeader = function(){
      var $header = $('#header'),
          headerHeight = $header.height();

      $(window).on('scroll', function(e){
        var scroll = $(window).scrollTop();

        if (scroll > headerHeight) {
          $header.addClass('sticky');
        } else {
          $header.removeClass('sticky');
        }
      });
    };

    return Home;

  })();

  $(function() {
    return new Home({});
  });

}).call(this);
