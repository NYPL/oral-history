app.views.EditTranscript = app.views.Transcripts.extend({

  el: 'body',

  events: {
    "click .toggle-play-link": "playSelected"
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
          that.next();
          break;
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
    });
    if (this.paused()) {
      this.player.play();
      $('.toggle-play-link').addClass('active');
    }
  },

  prev: function(){
    this.select(this.part_index-1);
  },

  select: function(i){
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
