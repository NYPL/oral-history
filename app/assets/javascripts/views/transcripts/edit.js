app.views.EditTranscript = app.views.Transcripts.extend({

  el: 'body',

  events: {
    "click .toggle-play-link": "togglePlay"
  },

  initialize: function(){
    this.part_index = -1;
    this.initAll();
  },

  initKeys: function(){
    var that = this;
    $(window).keydown(function(e){
      switch(e.keyCode) {
        case 9: // tab
          e.preventDefault();
          that.selectTextRange();
          break;
        case 13: // enter
        case 40: // down arrow
          e.preventDefault();
          that.saveChange();
          that.next();
          break;
        case 38: // up arrow
          e.preventDefault();
          that.prev();
          break;
        case 82: // ctrl + r
          if (e.ctrlKey) {
            e.preventDefault();
            that.playSelected();
          }
      }
    });
  },

  clearSelected: function(){
    var $part = $('.part.active').first(),
        end = Math.round($part.attr('data-end') * 1000);

    this.player.clearOnPosition(end);
    if (!this.paused()) {
      this.pause();
    }
  },

  next: function(){
    this.select(this.part_index+1);

    this.logChange('progress', 'line', helper.round((this.part_index+1)/$('.part').length,3));
  },

  onReady: function(){
    var that = this;

    this.initKeys();

    $('#transcript').on('click', '.part', function(e){
      e.preventDefault();
      var i = $('#parts .part').index($(this));
      that.select(i);
    });

    this.next();
  },

  playSelected: function(e){
    e && e.preventDefault();

    var that = this,
        $part = $('.part.active').first(),
        start = Math.round($part.attr('data-start') * 1000),
        end = Math.round($part.attr('data-end') * 1000);

    this.player.setPosition(start);
    this.player.clearOnPosition(end);
    this.player.onPosition(end, function(e){
      that.pause();
      that.player.setPosition(start);
    });
    if (this.paused()) {
      this.player.play();
      $('.toggle-play-link').addClass('active');
    }
  },

  prev: function(){
    this.select(this.part_index-1);
  },

  save: function(){
    var that = this,
        action_url = $('#transcript').attr('data-action'),
        body = {transcript: this.transcript};

    body = JSON.stringify(body);

    $.ajax({
      type: "POST",
      url: action_url,
      data: {body: body},
      complete: function(){
        console.log('Saved current transcript');
        that.flashMessage('Saved changes.');
      }
    });
  },

  saveChange: function(){
    var active_text = $('.part.active input').first().val(),
        previous_text = this.transcript.parts[this.part_index]['text'];

    if (active_text != previous_text){
      this.transcript.parts[this.part_index]['text'] = active_text;
      this.save();
      this.logChange('edit', 'line', (active_text.length - previous_text.length));
    }
  },

  select: function(i){
    if (i==this.part_index) {
      return false;
    }

    if ($('.part.active').length > 0) {
      this.clearSelected();
    }

    this.part_index = i;

    if (this.part_index < 0)
      this.part_index = 0;

    if (this.part_index >= $('.part').length)
      this.part_index = $('.part').length - 1;

    var $part = $('#parts .part').eq(this.part_index);

    $('.part').removeClass('active');
    $part.addClass('active');
    $part.find('input').focus();
    this.centerSelected();
    this.playSelected();
  },

  selectTextRange: function(){
    var $input = $('.part.active input').first(),
        sel_index = $input.attr('data-sel-index') || -1,
        input = $input[0],
        text = input.value,
        words = text.split(' '),
        start = 0,
        end = 0;

    // determine word selection
    sel_index++;
    if (sel_index >= words.length) {
      sel_index = 0;
    }

    $.each(words, function(i, w){
      if (i==sel_index) {
        end = start + w.length;
        return false;
      }
      start += w.length + 1;
    });

    if (input.setSelectionRange){
      input.setSelectionRange(start, end);
      $input.attr('data-sel-index', sel_index);
    }
  }

});
