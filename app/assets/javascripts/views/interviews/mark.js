app.views.MarkInterview = app.views.Interviews.extend({

  el: '#interview-mark',
   
  place_annotation_offset: 1,  
  save_on_change: true,
  
  events: {
    "click .start-button": "togglePlay",
    "click .button-play": "togglePlay",
    "click .button-mark": "placeAnnotation",
    "click .button-back": "goBack",
    "click .button-undo": "deleteLastAnnotation",
    "click .button-restart": "restart",
    "click .save-interview": "saveInterview",
    "click #timeline": "seekFromTimeline"
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
    var that = this,
        i = 0;
    // add annotations to view
    interview.get('annotations').each(function(m){
      that.addAnnotationToView(m,i);
      i++;
    });
    // show start button
    this.$('.start-button').removeClass('hide');
    // show done button
    if ( interview.get('annotations').length > 0 ) {
      this.$('.done-button').removeClass('hide');
    }
  },

  initKeys: function(){
    var that = this;
    $(window).keydown(function(e){ 
      switch( e.keyCode ) {
        case 8: // backspace
          e.preventDefault();
          that.deleteLastAnnotation();
          break;
        case 13: // enter
          e.preventDefault();
          that.placeAnnotation();
          break;    
        case 32: // space
          e.preventDefault();
          that.togglePlay();
          break;
        case 37: // left arrow
          e.preventDefault();
          that.goBack();
          break;
        case 46: // delete
          e.preventDefault();
          that.deleteSelectedAnnotation();
          break;
        case 82: // r
          e.preventDefault();
          that.restart();
          break;
      }
    });
  },
  
  addAnnotation: function(time){
    var add_seconds = this.place_annotation_offset,
        adjusted_time = time > add_seconds ? time - add_seconds : time,        
        existing_annotation = this.model.get('annotations').findWhere({start: adjusted_time}),
        annotation;
    // annotation already exists at this time
    if (existing_annotation) return false;
    
    // add annotation to collection     
    annotation = new app.models.Annotation({
      start: adjusted_time,
      interview_id: this.model.get('id')
    });
    this.model.get('annotations').add(annotation);  
      
    // add annotation to view    
    this.addAnnotationToView(annotation);
    this.logChange('add',annotation.id);
  },
  
  deleteLastAnnotation: function(e){
    if (e) e.preventDefault();
    var deleted_annotation = this.model.get('annotations').pop(),
        annotation_id;     
    if (deleted_annotation) {
      annotation_id = deleted_annotation.id;
      this.deleteAnnotationFromView(deleted_annotation);
      deleted_annotation.clear();      
      this.logChange('delete',annotation_id);
    }    
  },
  
  deleteSelectedAnnotation: function(){
    var $selected = this.$('.annotation.selected')
        annotation_id = $selected.attr('data-id'),
        annotation = this.model.get('annotations').get(annotation_id);
    this.model.get('annotations').remove(annotation);
    annotation.clear();
    this.logChange('delete',annotation_id);
  },
  
  goToAnnotation: function(annotation){
    var time = annotation.get('start');
    this.player.currentTime(time);
  },
  
  placeAnnotation: function(e){
    if (e) e.preventDefault();
    var that = this,
        current_time = parseInt(this.player.currentTime());
    // player hasn't started
    if ( !current_time && this.player.paused() ) {
      this.togglePlay();
      
    } else if ( current_time || current_time===0 ) {
      this.addAnnotation( current_time );
        this.$('.done-button').removeClass('hide');
      // flash mark button
      this.$('.button-mark').addClass('active');
      setTimeout(function(){
        that.$('.button-mark').removeClass('active');
      },100);
    }
    
  }

});
