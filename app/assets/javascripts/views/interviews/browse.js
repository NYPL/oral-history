app.views.BrowseInterviews = Backbone.View.extend({
  
  el: '#home-container',
  
  events: {
    "submit #search-form": "searchFormSubmit"
  },
  
  initialize: function(){    
    this.initInterviews();
  },
  
  initInterviews: function(){
    var that = this;
    this.interviews = new app.collections.Interviews;
    this.interviews.fetch({
      success: function(collection, response, options){
        console.log(collection.length + ' interviews loaded.');
        that.afterInterviewsLoaded(collection);
      }
    });
  },
  
  initAnnotations: function(){
    // reduce interview annotations to a single array
    this.annotations = this.interviews.reduce(function(memo, interview){
      return memo.concat(interview.get('annotations'));
    },[]);
  },
  
  afterInterviewsLoaded: function(interviews){
    this.renderResults(interviews);
    this.initAnnotations();    
  },
  
  doSearch: function(q){
    var interview_results = [],
        annotations_results = [];
    q = q.toLowerCase();
    // search name and summary for keyword
    interview_results = this.interviews.filter(function(i){
      return (i.get('storyteller_name').toLowerCase().indexOf(q) != -1 || i.get('summary').toLowerCase().indexOf(q) != -1);
    })
    // search annotation text keyword
    annotations_results = _.filter(this.annotations, function(a){ 
      return (a.text.toLowerCase().indexOf(q) != -1);
    });
    if (interview_results.length || annotations_results.length) {
      console.log('Found '+interview_results.length+' interviews and '+annotations_results.length + ' annotations.');
      this.renderSearchResults(interview_results, annotations_results);
    } else {
      alert('Sorry, no results found!');
    }
  },
  
  loadIsotope: function(){
    if (this.iso) {
      this.iso.destroy();
    }
    this.iso = new Isotope( '#interviews-list', {
      // options
      itemSelector: 'li'
    });  
  },
  
  renderResults: function(results){
    var that = this;
    this.resetListView();    
    results.each(function(interview){
      var interview_view = new app.views.InterviewListItem({model: interview});
      that.$('#interviews-list').append(interview_view.render().$el);
    });
    this.loadIsotope();
  },
  
  renderSearchResults: function(interview_results, annotations_results){
    var that = this,
        results = new app.collections.Interviews(interview_results);    
    // add annotation results
    _.each(annotations_results, function(ar){
      // check existing results
      var found_interview = results.findWhere({slug: ar.interview_id});
      // interview not found in existing results
      if (!found_interview) {
        found_interview = that.interviews.findWhere({slug: ar.interview_id});        
        results.push(found_interview);      
      }
      results.get(found_interview.id).get('matched_annotations').push(ar);
    });
    
    console.log(results)
    
    // render results
    this.$('#interviews-list').addClass('search-results');
    this.renderResults(results);
  },
  
  resetListView: function(){
    this.$('#interviews-list').empty();    
  },
  
  resetMatchedAnnotations: function(){
    this.interviews.invoke('set', {'matched_annotations': []});
  },
  
  resetResults: function(){
    this.$('#interviews-list').removeClass('search-results');
    this.renderResults(this.interviews);
  },
  
  searchFormSubmit: function(e){
    e.preventDefault();
    var q = $('#search-input').val();
    this.resetMatchedAnnotations();
    if (q.length){
      this.doSearch(q);
    } else {
      this.resetResults();
    }
  }

});