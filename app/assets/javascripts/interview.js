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

      // listen for toggle annotations
      $('.see-more-link').on('click',function(e){
        e.preventDefault();
        $('.annotations-container').addClass('active');
        $('.see-more').hide();
      });

      $(window).on('scroll', function(e){
        _this.stickyPlayer();
      });
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
