//= require ../vendor/underscore-min

(function() {
  var Annotations;

  Annotations = (function() {
    function Annotations(options) {
      var defaults = {
        debug: false
      };
      this.options = $.extend(defaults, options);
      this.init();      
    }   
    
    Annotations.prototype.init = function(){
      var _this = this;
      
      $.ajax({ url: '/admin/annotations.json',
        type: 'GET',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        success: function(interviews) {
          _this.displayAnnotations(interviews);
        }
      });      
      
    };
    
    Annotations.prototype.displayAnnotations = function(interviews){
      var $container = $('#annotations');
      
      // retrieve annotations
      _.each(interviews, function(interview, i){
        
        var $interview = $('<div class="interview"><h5><a href="/interviews/'+interview.slug+'">'+interview.storyteller_name+'</a></h5></div>')
            
        _.each( $.parseJSON(interview.annotations), function(annotation) {
          var text = annotation.text.trim().toLowerCase();
          if (text.length) {
            var time = helper.formatTime(annotation.start);
            $interview.append($('<a href="/interviews/'+interview.slug+'#'+time+'">'+text+'</a>'));
          }
        });
        
        $container.append($interview);
      });
      
            
      
    };

    return Annotations;

  })();

  $(function() {
    return new Annotations({});
  });

}).call(this);
