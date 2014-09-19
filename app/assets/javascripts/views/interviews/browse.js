app.views.BrowseInterviews = Backbone.View.extend({
  
  el: '#neighborhood-container',
  
  events: {
    "click .branch-link": "filterBranchFromLink",
    "blur #search-input": "searchFormBlur",
    "submit #search-form": "searchFormSubmit"
  },
  
  initialize: function(options){
    var neighborhood_id = options && options.neighborhood_id? options.neighborhood_id : null;
    
    this.branchId = 0;
    this.initInterviews(neighborhood_id);
  },
  
  initInterviews: function(neighborhood_id){
    var that = this;
    this.interviews = new app.collections.Interviews;
    if (neighborhood_id) this.interviews.setNeighborhood(neighborhood_id);
    this.interviews.fetch({
      success: function(collection, response, options){
        console.log(collection.length + ' interviews loaded.');
        that.afterInterviewsLoaded(collection);
      }
    });    
  },
  
  initAnnotations: function(){
    // reduce interview annotations to a single array
    this.annotation_hashes = this.interviews.reduce(function(memo, interview){
      return memo.concat(interview.get('annotations'));
    },[]);
  },
  
  afterInterviewsLoaded: function(interviews){
    this.interview_hashes = this.interviews.toReadOnlyJSON();
    this.renderResults(interviews);
    this.initAnnotations();    
  },
  
  doSearch: function(q){
    var interview_results = [],
        annotations_results = [];
    q = q.toLowerCase();
    // search name and summary for keyword
    interview_results = _.filter(this.interview_hashes, function(i){
      return (i.storyteller_name.toLowerCase().indexOf(q) != -1 || i.summary.toLowerCase().indexOf(q) != -1);
    })
    // search annotation text keyword
    annotations_results = _.filter(this.annotation_hashes, function(a){ 
      return (a.text.toLowerCase().indexOf(q) != -1);
    });
    if (interview_results.length || annotations_results.length) {
      console.log('Found '+interview_results.length+' interviews and '+annotations_results.length + ' annotations.');
      this.renderSearchResults(interview_results, annotations_results);
    } else {
      alert('Sorry, no results found!');
    }
  },
  
  filterBranch: function(branchId){
    var $link = $('.branch-link[data-branch-id="'+branchId+'"]');
    
    $('.branch-link').removeClass('selected');
    $link.addClass('selected');
    
    this.branchId = branchId;
    this.searchFormSubmit();
  },
  
  filterBranchFromLink: function(e){
    e.preventDefault();
    var branchId = parseInt($(e.currentTarget).attr('data-branch-id'));
    this.filterBranch(branchId);
  },
  
  loadIsotope: function(){
    if (this.iso) {
      this.iso.destroy();
    }
    this.iso = new Isotope( '#interviews-list', {
      itemSelector: 'li'
    });  
  },
  
  renderResults: function(results){
    var that = this;
    this.resetListView();    
    results.each(function(interview){
      if (that.branchId > 0 && that.branchId != interview.get('branch_id')) return;
      var interview_view = new app.views.InterviewListItem({model: interview});
      that.$('#interviews-list').append(interview_view.render().$el);
    });
    this.loadIsotope();
  },
  
  renderSearchResults: function(interview_results, annotations_results){
    var that = this,
        results = interview_results,
        results_collection;
        
    // add annotation results
    _.each(annotations_results, function(ar){
      // check existing results
      var found_interview = _.findWhere(results,{slug: ar.interview_id});
      // interview not found in existing results
      if (!found_interview) {
        found_interview = _.findWhere(that.interview_hashes,{slug: ar.interview_id});        
        results.push(found_interview);   
      }
      found_interview.matched_annotations.push(ar);
    });
    
    // convert array to collection
    results_collection = new app.collections.Interviews(results);
    
    // render results
    this.$('#interviews-list').addClass('search-results');
    this.renderResults(results_collection);
  },
  
  resetListView: function(){
    this.$('#interviews-list').empty();    
  },
  
  resetMatchedAnnotations: function(){
    _.each(this.interview_hashes, function(interview){ interview.matched_annotations = []; });
  },
  
  resetResults: function(){
    this.$('#interviews-list').removeClass('search-results');
    this.renderResults(this.interviews);
  },
  
  searchFormBlur: function(e){
    this.searchFormSubmit();
  },
  
  searchFormSubmit: function(e){
    if (e) e.preventDefault();
    var q = $('#search-input').val();
    this.resetMatchedAnnotations();
    if (q.length){
      this.doSearch(q);
    } else {
      this.resetResults();
    }
  }

});