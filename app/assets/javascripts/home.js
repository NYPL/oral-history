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

      this.stickyHeader();

      $('.scroll-to').on('click', function(e){
        e.preventDefault();
        _this.scrollTo($(this).attr('href'));
      });
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
