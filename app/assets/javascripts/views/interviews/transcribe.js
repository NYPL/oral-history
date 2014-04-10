app.views.TranscribeInterview = app.views.Interviews.extend({

  el: '#interview-transcribe',
  
  nudge_seconds: 2,
  current_annotation_index: 0,
  current_annotation: null,
  save_on_change: true,
  autocomplete_texts: [],
  autocomplete_initialized: false,
  cue_index: [],
  
  events: {
    "click .start-button": "replayCurrentAnnotation",
    "click .button-replay": "replayCurrentAnnotation",
    "click .button-previous": "playLastAnnotation",
    "submit .annotation-form": "submit",
    "click .button-nudge-left": "nudgeLeft",
    "click .button-nudge-right": "nudgeRight",
    "click .save-interview": "saveInterview"
  },
  
  initialize: function(){    
    this.initPopcorn();
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
    // select first annotation
    this.initAnnotation(interview);
    // init cues
    this.initCues(interview);
    // init autocomplete
    this.initAutocomplete();
    // show start button
    this.$('.start-button').removeClass('hide');
  },
  
  initAnnotations: function(interview){
    var that = this,
        i = 0;    
    interview.get('annotations').each(function(m){
      that.addAnnotationToView(m,i,that);
      that.addAutocompleteText(m.get('text'));
      i++;
    });
  },
  
  initAutocomplete: function(){
    var autocomplete_texts = _.uniq( this.model.get('annotations').pluck('text') );
    this.autocomplete_texts = autocomplete_texts;
    $("#input-text").autocomplete({
      source: autocomplete_texts
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
            that.playLastAnnotation(); 
          } else {
            that.replayCurrentAnnotation();
          }                    
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
  
  initAnnotation: function(interview){    
    var first_empty_annotation = interview.get('annotations').findWhere({'text':""});
    this.current_annotation_index = 0;
    if ( first_empty_annotation ) this.current_annotation_index = this.model.get('annotations').indexOf(first_empty_annotation);
    this.current_annotation = this.model.get('annotations').at(this.current_annotation_index);
    this.$current_annotation = this.annotations[ this.current_annotation.get('id') ];
    this.goToCurrentAnnotation();
    this.focusInput(this.current_annotation.get('text'));
  },
  
  addAutocompleteText: function(value){    
    // if not already here, add entity to autocomplete
    if ( this.autocomplete_initialized && this.autocomplete_texts.indexOf(value) < 0 ) {
      this.autocomplete_texts.push(value);
      $( "#input-text" ).autocomplete( "option", "source", this.autocomplete_texts );
    }
  },
  
  addCue: function(annotation, time){
    var that = this,
        key = annotation.id + '_' + time;
    // make sure to only add one cue per annotation/time  
    if (this.cue_index.indexOf(key) < 0) {
      this.cue_index.push(key);
      this.player.cue( time, function() {
        if ( that.current_annotation.id == annotation.id )
          this.pause();
      });      
    }    
  }, 
  
  focusInput: function(value) {
    value = value || this.current_annotation.get('text');
    // set entity value and focus
    if ( value ) {
      $('#input-text').val(value);
    } else {
      $('#input-text').val('');
    }
    $('#input-text').focus();
  },
  
  goToCurrentAnnotation: function(){
    if ( !this.$current_annotation.isSelected() ) this.$current_annotation.select();
    this.player.currentTime(this.current_annotation.get('start'));
  },
  
  goToLastAnnotation: function(){
    this.current_annotation_index -= 1;
    if ( this.current_annotation_index < 0 ) this.current_annotation_index = 0;
    this.current_annotation = this.model.get('annotations').at(this.current_annotation_index);
    this.$current_annotation = this.annotations[ this.current_annotation.get('id') ];
    this.goToCurrentAnnotation();
  },
  
  goToAnnotation: function(annotation){
    this.current_annotation_index = this.model.get('annotations').indexOf(annotation);    
    this.current_annotation = this.model.get('annotations').at(this.current_annotation_index);
    this.$current_annotation = this.annotations[ this.current_annotation.get('id') ];
    this.goToCurrentAnnotation();
  },
  
  goToNextAnnotation: function(autoplay){
    this.current_annotation_index ++;
    if ( this.current_annotation_index >= this.model.get('annotations').length ) {
      // this.current_annotation_index = 0;
      // TODO: this.invokeFinishedModal();
    } else {
      this.current_annotation = this.model.get('annotations').at(this.current_annotation_index);
      this.$current_annotation = this.annotations[ this.current_annotation.get('id') ];
      this.goToCurrentAnnotation();
      if (autoplay) this.replayCurrentAnnotation();
    }
    
  },
  
  invokeFinishedModal: function(){
    this.$('#finished-modal').modal('show');
  },
  
  nudgeLeft: function(e){
    if (e) e.preventDefault();
    if ( !this.$current_annotation.isSelected() ) this.$current_annotation.select();
    this.player.currentTime(this.current_annotation.get('start')-this.nudge_seconds);
    this.player.play();
    this.focusInput();
  },
  
  nudgeRight: function(e){
    if (e) e.preventDefault();
    if ( !this.$current_annotation.isSelected() ) this.$current_annotation.select();
    this.addCue(this.current_annotation, this.current_annotation.get('end')+this.nudge_seconds);
    this.player.play();
    this.focusInput();
  },
  
  playLastAnnotation: function(e){
    if (e) e.preventDefault();
    this.goToLastAnnotation();
    this.replayCurrentAnnotation();
  },
  
  playAnnotation: function(annotation){
    this.goToAnnotation(annotation);
    this.replayCurrentAnnotation();
  },
  
  replayCurrentAnnotation: function(e){
    if (e) e.preventDefault();
    var value = this.current_annotation.get('text');
    
    this.goToCurrentAnnotation();
    this.player.play();
    
    // set entity value and focus
    this.focusInput(value);
    
    // hide start button
    this.$('.start-button').addClass('hide');
  },
  
  submit: function(e, value){
    if (e) e.preventDefault();
    var value = value || $('#input-text').val();    
    
    if ( value.length <= 0 ) return false;
    
    // only change if different
    if ( value != this.current_annotation.get('text') ) {
      
      // set entity value in model
      this.current_annotation.set('text',value);
      this.model.get('annotations').at(this.current_annotation_index).set('text',value);
      
      // add autocomplete
      this.addAutocompleteText(value);
      
      // log change
      this.logChange('edit',this.current_annotation.id);
      
      // console.log( this.model.get('annotations').toJSON() );
      
    }    
    
    // go to and play next annotation
    this.goToNextAnnotation(true);
  }

});
