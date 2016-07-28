//= require interview-transcript

(function() {
  var Interview;

  Interview = (function() {
    function Interview(options) {
      var defaults = {
        debug: false
      };
      this.options = $.extend(defaults, options);
      this.init();
    }

    Interview.prototype.init = function(){
      this.$player = $('.interview-player').first();

      this.loadListeners();
      this.checkForTagsOverflow();
    };

    Interview.prototype.checkForTagsOverflow = function(){
      var $container = $('.annotations-container').first(),
          $inner = $('.annotations').first();

      if ($inner.height() > $container.height()) {
        $container.addClass('overflowed');
      }
    };

    Interview.prototype.loadListeners = function(){
      var _this = this;

      // listen for toggle
      $('.toggle-active').on('click',function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        $(target).toggleClass('active');
      });

      $(window).on('scroll', function(e){
        _this.stickyPlayer();
      });

      $('.scroll-to').on('click', function(e){
        e.preventDefault();
        _this.scrollTo($(this).attr('href'));
      });
    };

    Interview.prototype.scrollTo = function(el, offset){
      var $el = $(el);
      offset = offset || $('#header').height() || 0;

      $('html, body').animate({
        scrollTop: $el.offset().top - offset
      }, 2000);
    };

    Interview.prototype.stickyPlayer = function(){
      var scroll = $(window).scrollTop();
      var playerTop = this.$player.offset().top;
      var headerHeight = $('#header').height();

      if ((scroll+headerHeight) > playerTop) {
        this.$player.addClass('sticky');
      } else {
        this.$player.removeClass('sticky');
      }
    };

    return Interview;

  })();

  $(function() {
    return new Interview({});
  });

}).call(this);
