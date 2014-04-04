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
      
    };

    return Home;

  })();

  $(function() {
    return new Home({});
  });

}).call(this);
