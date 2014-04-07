app.views.TranscribeInterview = app.views.Interviews.extend({

  el: '#interview-transcribe',
  
  nudge_seconds: 2,
  current_segment_index: 0,
  current_segment: null,
  save_on_change: true,
  entities: [],
  autocomplete_initialized: false,
  cue_index: [],
  
  events: {
    "click .button-replay": "replayCurrentSegment",
    "click .button-previous": "playLastSegment",
    "click .button-next": "submitSegment",
    "click .button-nudge-left": "nudgeLeft",
    "click .button-nudge-right": "nudgeRight",
    "click .save-interview": "saveInterview",
    "click #timeline": "deselectAnnotations"
  },
  
  initialize: function(){    
    this.initPopcorn();
    // this.initAutoSave();
  },
  
  initAfterMediaLoaded: function(player){
    this.initTimeline( player.duration() );
    this.initInterview();
    this.initCurrentProgress();
    this.initKeys();
  },
  
  initAfterInterviewLoaded: function(interview){    
    // add annotations to view
    this.initAnnotations(interview);
    // select first segment
    this.initSegment(interview);
    // init cues
    this.initCues(interview);
    // init autocomplete
    this.initAutocomplete();
  },
  
  initAutocomplete: function(){
    var entities = _.uniq( this.model.get('annotations').pluck('entity_value') );
    this.entities = entities;
    $("#input-text").autocomplete({
      source: entities
    });
    this.autocomplete_initialized = true;
  },
  
  initCues: function(interview){
    var that = this;
    // pause whenever a annotation ends
    interview.get('annotations').each(function(m){
      that.addCue(m, m.get('end'));
    });    
  },
  
  initKeys: function(){
    var that = this;
    $(window).keydown(function(e){ 
      switch( e.keyCode ) {
        case 9: // tab
          e.preventDefault();
          if ( e.shiftKey ) {
            that.playLastSegment(); 
          } else {
            that.replayCurrentSegment();
          }                    
          break;
        case 13: // enter
          e.preventDefault();
          that.submitSegment();
          break;
        case 37: // left arrow
          if ( e.shiftKey ) {
            e.preventDefault();
            that.nudgeLeft();
          }
          break;
        case 39: // right arrow
          if ( e.shiftKey ) {
            e.preventDefault();
            that.nudgeRight();
          }
          break;
      }           
    });
  },
  
  initAnnotations: function(interview){
    var that = this,
        i = 0;
    interview.get('annotations').each(function(m){
      that.addAnnotationToView(m,i);
      that.addEntity(m.get('entity_value'));
      i++;
    });
  },
  
  initSegment: function(interview){    
    var first_empty_annotation = interview.get('annotations').findWhere({'entity_value':""});
    this.current_segment_index = 0;
    if ( first_empty_annotation ) this.current_segment_index = this.model.get('annotations').indexOf(first_empty_annotation);
    this.current_segment = this.model.get('annotations').at(this.current_segment_index);
    this.$current_segment = this.annotations[ this.current_segment.get('id') ];
    this.goToCurrentSegment();
    this.focusInput(this.current_segment.get('entity_value'));
  },
  
  addCue: function(annotation, time){
    var that = this,
        key = annotation.id + '_' + time;
    // make sure to only add one cue per annotation/time  
    if (this.cue_index.indexOf(key) < 0) {
      this.cue_index.push(key);
      this.player.cue( time, function() {
        if ( that.current_segment.id == annotation.id )
          this.pause();
      });      
    }    
  },
  
  addEntity: function(value){    
    // if not already here, add entity to autocomplete
    if ( this.autocomplete_initialized && this.entities.indexOf(value) < 0 ) {
      this.entities.push(value);
      $( "#input-text" ).autocomplete( "option", "source", this.entities );
    }
  },
  
  focusInput: function(value) {
    value = value || this.current_segment.get('entity_value');
    // set entity value and focus
    if ( value ) {
      $('#input-text').val(value);
    } else {
      $('#input-text').val('');
    }
    $('#input-text').focus();
  },
  
  goToCurrentSegment: function(){
    if ( !this.$current_segment.isSelected() ) this.$current_segment.select();
    this.player.currentTime(this.current_segment.get('start'));
    this.scrollToCurrentSegment();
  },
  
  goToLastSegment: function(){
    this.current_segment_index -= 1;
    if ( this.current_segment_index < 0 ) this.current_segment_index = 0;
    this.current_segment = this.model.get('annotations').at(this.current_segment_index);
    this.$current_segment = this.annotations[ this.current_segment.get('id') ];
    this.goToCurrentSegment();
  },
  
  goToAnnotation: function(annotation){
    this.current_segment_index = this.model.get('annotations').indexOf(annotation);    
    this.current_segment = this.model.get('annotations').at(this.current_segment_index);
    this.$current_segment = this.annotations[ this.current_segment.get('id') ];
    this.goToCurrentSegment();
  },
  
  goToNextSegment: function(){
    this.current_segment_index ++;
    if ( this.current_segment_index >= this.model.get('annotations').length ) {
      this.current_segment_index = 0;
      this.invokeFinishedModal();
    }
    this.current_segment = this.model.get('annotations').at(this.current_segment_index);
    this.$current_segment = this.annotations[ this.current_segment.get('id') ];
    this.goToCurrentSegment();
  },
  
  invokeFinishedModal: function(){
    this.$('#finished-modal').modal('show');
  },
  
  isTyping: function(value){
    var $input = $('#input-text'),
        val = $input.val();
    // I'm typing if input is focused and input string is > 0
    return ( $input.is( ":focus" ) && val.length > 0 );
  },
  
  nudgeLeft: function(e){
    if (e) e.preventDefault();
    if ( !this.$current_segment.isSelected() ) this.$current_segment.select();
    this.player.currentTime(this.current_segment.get('start')-this.nudge_seconds);
    this.player.play();
    this.focusInput();
  },
  
  nudgeRight: function(e){
    if (e) e.preventDefault();
    if ( !this.$current_segment.isSelected() ) this.$current_segment.select();
    this.addCue(this.current_segment, this.current_segment.get('end')+this.nudge_seconds);
    this.player.play();
    this.focusInput();
  },
  
  playLastSegment: function(e){
    if (e) e.preventDefault();
    this.goToLastSegment();
    this.replayCurrentSegment();
  },
  
  playSegment: function(annotation){
    this.goToAnnotation(annotation);
    this.replayCurrentSegment();
  },
  
  replayCurrentSegment: function(e){
    if (e) e.preventDefault();
    var value = this.current_segment.get('entity_value');
    
    this.goToCurrentSegment();
    this.player.play();
    
    // set entity value and focus
    this.focusInput(value);
  },
  
  scrollToCurrentSegment: function(){
    // scroll annotation into view
    var $timeline = $('#timeline'),
        pos = this.$current_segment.$el.position(),
        timeline_width = parseInt( $timeline.width() ),
        left_offset = timeline_width * 2 / 5,
        left = pos.left - left_offset;
    if ( left < 0 ) left = 0;    
    $timeline.animate({ scrollLeft: left });
  },
  
  selectEntity: function(value){
    $('#input-text').val(value);
    this.submitSegment(null, value);
  },
  
  submitSegment: function(e, value){
    if (e) e.preventDefault();
    var value = value || $('#input-text').val();    
    
    if ( value.length <= 0 ) return false;
    
    // only change if different
    if ( value != this.current_segment.get('entity_value') ) {
      
      // set entity value in model
      this.current_segment.set('entity_value',value);
      this.model.get('annotations').at(this.current_segment_index).set('entity_value',value);
      
      // add entity
      this.addEntity(value);
      
      // log change
      this.logChange('edit',this.current_segment.id);
      
    }    
    
    // go to and play next segment
    this.goToNextSegment();
    this.replayCurrentSegment();
  }

});
