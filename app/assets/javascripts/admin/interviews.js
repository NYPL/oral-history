(function() {
  var Interview;

  Interview = (function() {
    function Interview(options) {
      var defaults = {  };
      this.options = $.extend(defaults, options);
      this.loadListeners();
    }

    Interview.prototype.addNewField = function(){
      var $field = $('<div class="custom-field"><input type="text" class="custom-field-label" placeholder="Label" /><input type="text" class="custom-field-value" placeholder="Value" /></div>');
      var $button = $('.add-custom-field').first();
      $button.before($field);
    };

    Interview.prototype.addCustomField = function(){
      var $fields = $('.custom-field');

      if ($fields.length) {
        var $last = $fields.last();
        var label = $last.find('.custom-field-label').first().val();
        var value = $last.find('.custom-field-value').first().val();

        if (!label.length || !value.length) {
          alert('Please enter a label and value.');

        } else {
          this.updateCustomFields();
          this.addNewField();
        }
      }
    };

    Interview.prototype.loadListeners = function(){
      var _this = this;

      $('.add-custom-field').on('click', function(e){
        e.preventDefault();
        _this.addCustomField();
      });

      $('.custom-field-label, .custom-field-value').on('blur', function(e){
        e.preventDefault();
        _this.updateCustomFields();
      })
    };

    Interview.prototype.updateCustomFields = function(){
      var $fields = $('.custom-field');
      var fields = [];
      $fields.each(function(i, el){
        var label = $(el).find('.custom-field-label').first().val();
        var value = $(el).find('.custom-field-value').first().val();
        if (label.length && value.length) {
          fields.push({
            label: label,
            value: value
          });
        }
      });
      $('#interview_custom_fields').val(JSON.stringify(fields));
    };

    return Interview;

  })();

  $(function() {
    return new Interview({});
  });

}).call(this);
