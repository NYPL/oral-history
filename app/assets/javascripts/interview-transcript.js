//= require_tree ../templates

(function() {
  var Transcript;

  Transcript = (function() {
    function Transcript(options) {
      var defaults = {
        debug: false,
        el: '#transcript-wrapper',
        urlPattern: 'http://transcribe.oralhistory.nypl.org/transcript_files/{id}.json',
        template_line: 'transcript_line'
      };
      this.opt = $.extend(defaults, options);
      this.init();
    }

    Transcript.prototype.init = function(){
      this.$el = $(this.opt.el);
      this.$lines = this.$el.find('#transcript-lines');
      this.template_line = JST[this.opt.template_line];

      this.loadListeners();
      this.loadTranscript();
    };

    Transcript.prototype.createLineIndex = function(lines){
      if (lines.length < 2) return false;

      var last_line = lines[lines.length-1];
      var end = last_line.end;

      var index = new Array(end);
      var maxIndex = last_line.sequence;
      var currentLine = lines[0];
      var nextLine = lines[1]
      for (var i=0; i<index.length; i++) {
        if (i >= nextLine.start) {
          currentLine = lines[nextLine.sequence];
          if (nextLine.sequence < maxIndex) {
            nextLine = lines[nextLine.sequence + 1];
          }
        }
        index[i] = currentLine.sequence;
      }

      this.transcriptIndex = index;
    };

    Transcript.prototype.loadListeners = function(){
      var _this = this;

      $(window).on('player-load', function(e, id, player){
        // add listener on play
        player.addEventListener('timeupdate', function(e) {
          _this.onTimeUpdate(player.currentTime);
        }, false);
      });
    };

    Transcript.prototype.loadTranscript = function(){
      var _this = this;
      var path = window.location.pathname;
      var id = path.split('/').pop();
      var url = this.opt.urlPattern.replace('{id}',id);

      $.getJSON(url, function(resp) {
        if (resp && resp.lines && resp.lines.length) {
          // console.log('loaded '+resp.lines.length+' lines')
          _this.onTranscriptLoad(resp);
        } else {
          _this.onTranscriptFail();
        }
      });
    };

    Transcript.prototype.onTimeUpdate = function(time) {
      if (!this.transcriptLoaded || !this.transcriptIndex) return false;

      var currentLineIndex = this.transcriptIndex[this.transcriptIndex.length-1];
      time = parseInt(time);

      if (time < this.transcriptIndex.length) {
        currentLineIndex = this.transcriptIndex[time];
      }

      var $line = this.$el.find('.line[data-sequence="'+currentLineIndex+'"]');

      if (!$line.length || !$line.hasClass('active')) {
        this.$el.find('.line').removeClass('active');
      }

      if ($line.length && !$line.hasClass('active')) {
        $line.addClass('active');
      }
    };

    Transcript.prototype.onTranscriptLoad = function(data){
      // update UI with transcript data
      this.$el.find('.last-updated').text(helper.formatDate(data.last_updated));
      this.$el.find('.edit-url').attr('href', data.url);
      this.transcriptURL = data.url;
      this.transcriptLines = this.parseLines(data.lines);
      this.createLineIndex(this.transcriptLines);

      this.renderLines(this.transcriptLines);

      // activate transcript elements
      $('.transcript-link').addClass('active');
      this.$el.addClass('active');
      this.transcriptLoaded = true;
    };

    Transcript.prototype.onTranscriptFail = function(){
      $('audio .captions').remove();
    };

    Transcript.prototype.parseLines = function(lines){
      var parsed = [];

      $.each(lines, function(i, line){
        var l = $.extend({}, line);
        l.start = Math.round(l.start_time / 1000);
        l.end = Math.round(l.end_time / 1000);
        parsed.push(l);
      });

      return parsed;
    };

    Transcript.prototype.renderLines = function(lines){
      var _this = this;
      this.$lines.empty();

      var $container = $('<div>');
      $.each(lines, function(i, line){
        var data = $.extend({},line);
        data.url = _this.transcriptURL + '?t=' + helper.formatTime(line.start_time/1000);
        var $line = _this.template_line(data);
        $container.append($line);
      });

      this.$lines.append($container);
    };

    return Transcript;

  })();

  $(function() {
    return new Transcript({});
  });

}).call(this);
