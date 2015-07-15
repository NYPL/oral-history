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
      this.growBanner();
      this.initListeners();
    };

    Interview.prototype.initListeners = function(){
      var that = this;

      // listen for window resize
      $(window).resize(function() {
        that.growBanner();
      });

      // listen for toggle annotations
      $('.button-toggle-annotations').on('click',function(e){
        e.preventDefault();
        $('.annotations').toggle();
      });

    };

    Interview.prototype.growBanner = function(){
      var window_height = $(window).height();
       $('.interview-banner').css('min-height', window_height+'px');
    };

    return Interview;

  })();

  $(function() {
    return new Interview({});
  });

}).call(this);
