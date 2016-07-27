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
      var that = this;

      // listen for toggle annotations
      $('.see-more-link').on('click',function(e){
        e.preventDefault();
        $('.annotations-container').addClass('active');
        $('.see-more').hide();
      });

    };

    return Interview;

  })();

  $(function() {
    return new Interview({});
  });

}).call(this);
