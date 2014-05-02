//= require ./config/wysiwyg_parser_rules
//= require ./vendor/wysihtml5-0.3.0.min

(function() {
  var WYSIWYG;

  WYSIWYG = (function() {
    function WYSIWYG(options) {
      var defaults = {
        debug: false
      };
      this.options = $.extend(defaults, options);
      this.init();      
    }   
    
    WYSIWYG.prototype.init = function(){
      var that = this;
      $('.wysiwyg-textarea').each(function(){
        that.initEditor($(this));        
      });
    };
    
    WYSIWYG.prototype.initEditor = function($textarea){
      var id = $textarea.attr('id'),
          toolbar_id = $textarea.attr('data-toolbar-id'),
          editor;      
      if (id && toolbar) {
        editor = new wysihtml5.Editor(id, {
          toolbar:      toolbar_id,
          parserRules:  wysihtml5ParserRules
        });
      }      
    };

    return WYSIWYG;

  })();

  $(function() {
    return new WYSIWYG({});
  });

}).call(this);
