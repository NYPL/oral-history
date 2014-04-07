app.views.Interviews = Backbone.View.extend({
  
  player: null,
  media_initialized: false,
  interview_initialized: false,
  change_made: false,
  autosave_ms: 10000,
  save_on_change: false,
  annotations: {},
  go_back_amount: 4,
  
  initAfterMediaLoaded: function(player){ /* override me */ },
  initAfterInterviewLoaded: function(interview){ /* override me */ },
  
  initAutoSave: function(){
    var that = this;
    setInterval(function(){
      that.saveInterview();
    },this.autosave_ms);
  },
  
  initCurrentProgress: function(){
    var that = this;
    this.$progress = this.$('#current-progress');  
    this.player.on('timeupdate', function() {
      that.updateCurrentProgress( this.currentTime() );
    });
  },
  
  initPopcorn: function(){
    var that = this,
        url = $('#media').attr('data-url');
    this.player = Popcorn.smart( "#media", url );
    this.player.on('canplay', function() {
      if ( !that.media_initialized ) {
        console.log('Media loaded...');
        that.media_initialized = true;     
        that.initAfterMediaLoaded(this);
      }       
    });
  },
  
  initInterview: function(){
    var that = this;
    this.model.fetch({
      success: function(model, response, options){        
        if ( !that.interview_initialized ) {
          console.log('Interview loaded...');
          that.interview_initialized = true;     
          that.initAfterInterviewLoaded(model); 
        }               
      }
    });
    if ( this.save_on_change ) {
      this.$('.save-interview').hide();
    }
  },
  
  initTimeline: function( duration ){
    console.log('Initializing timeline with duration of '+duration+'s');   
    var that = this,
        duration_f = helper.formatTime(duration);        
    this.$('#duration').text(duration_f);
    this.timeline_duration = duration;
  },
  
  addAnnotationToView: function(annotation, index){
    var that = this,
        annotation_view;
    annotation_view = new app.views.Annotation({
      model: annotation, 
      parent: that
    });
    this.$('#annotations').append(annotation_view.render().$el);
    this.annotations[ annotation.id ] = annotation_view;
  },
  
  deleteAnnotationFromView: function(annotation){
    var annotation_view = this.annotations[ annotation.id ];
    annotation_view.remove();
  },
  
  deselectAnnotations: function(e){
    if ( !e || e && !$(e.target).hasClass('annotation') ) {
      this.$('.annotation').removeClass('selected');
    }
  },
  
  logChange: function(action, id){
    this.change_made = true;
    this.$('.save-interview').removeClass('disabled');
    if ( this.save_on_change ) {
      this.saveInterview();
    }
  },
  
  goBack: function(e){
    if (e) e.preventDefault();
    var current_time = this.player.currentTime();
    current_time -= this.go_back_amount;
    if (current_time<0) current_time = 0;
    this.player.currentTime(current_time);
  },
  
  restart: function(e){
    if (e) e.preventDefault();
    if ( this.player ) this.player.currentTime(0);
  },
  
  saveInterview: function(e){
    if (e) e.preventDefault();
    if ( this.change_made ) {
      this.change_made = false;      
      this.model.save();      
      this.$('.save-interview').addClass('disabled');
    }
  },
  
  seek: function(time){
    if ( this.player ) this.player.currentTime(time);
  },
  
  seekFromTimeline: function(e){
    if (!this.timeline_duration) return false;
    var $el = $(e.currentTarget),
        width = $el.width(),
        parentX = $el.offset().left,
        mouseX = e.pageX;
        offsetX = mouseX - parentX,
        percent = parseFloat(offsetX/width),
        time = this.timeline_duration * percent;
    this.seek(time);    
  },
  
  togglePlay: function(e){
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if ( this.player ) {
      if ( this.player.paused() ) {
        this.player.play();
        this.$('.button-play .label').text('Pause');
      } else {
        this.player.pause();
        this.$('.button-play .label').text('Play');
      }
      this.$('.start-button').hide();
    }
  },
  
  updateCurrentProgress: function( time ){
    var time_f = helper.formatTime(time),
        percent = parseFloat( time / this.timeline_duration ) * 100;
    this.$('#progress').css('width',percent+'%');
    this.$('#current-time').text(time_f);
  }

});
