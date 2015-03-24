//= require ../vendor/underscore-min
//= require ../vendor/d3.min
//= require ../vendor/jquery.panzoom.min

(function() {
  var Annotations;

  Annotations = (function() {
    function Annotations(options) {
      var defaults = {
        debug: false
      };
      this.options = $.extend(defaults, options);
      this.init();      
    }   
    
    Annotations.prototype.init = function(){
      var _this = this;
      
      $.ajax({ url: '/admin/annotations.json',
        type: 'GET',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        success: function(interviews) {
          _this.displayAnnotations(interviews);
        }
      });
      
      // keyboard listeners
      $(document).on('keydown', function(e){        
        switch(e.keyCode) {          
          // j - output to json
          case 74:
            if (e.ctrlKey) {
              e.preventDefault();
              _this.exportJSON();
            }
            break;            
          default:
            break;
        }
      });
      
      
    };
    
    Annotations.prototype.displayAnnotations = function(interviews){
      var $container = $('#annotations'),
          annotations = [];
      
      // retrieve annotations
      _.each(interviews, function(interview){        
        _.each( $.parseJSON(interview.annotations), function(annotation) {
          var text = annotation.text.trim().toLowerCase();
          if (text.length) annotations.push(text);
        });
      });
      
      // save
      this.annotations = _.uniq(annotations);
      
      // calculate frequencies
      var frequencies = _.chain(annotations)
        .groupBy(function(x) { return x })
        .map(function(v, k) { return {packageName: ''+v.length, className: k, value: v.length} })
        .sortBy(function(x) { return -x.value })
        .value();
      
      this.makeChart(frequencies);
      this.panZoom();
    };
    
    Annotations.prototype.exportJSON = function(){
      var annotations = this.annotations,
          dataUrl = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(annotations));
      window.open(dataUrl, '_blank');
    };
    
    Annotations.prototype.makeChart = function(frequencies){      
        
      var diameter = 4000,
          format = d3.format(",d"),
          color = d3.scale.category20c();
      
      var bubble = d3.layout.pack()
          .sort(null)
          .size([diameter, diameter])
          .padding(1.5);
      
      var svg = d3.select("#annotations").append("svg")
          .attr("width", diameter)
          .attr("height", diameter)
          .attr("class", "bubble");
      
      var node = svg.selectAll(".node")
          .data(bubble.nodes({children: frequencies}))
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
      node.append("title")
          .text(function(d) { return d.className + ": " + format(d.value); });
    
      node.append("circle")
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { return color(d.value); });
    
      node.append("text")
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.className; });
      
      d3.select(self.frameElement).style("height", diameter + "px");
    };
    
    Annotations.prototype.panZoom = function(){   
      var $svg = $("#annotations").find('svg').first();
      
      var $panzoom = $svg.panzoom();    
      $panzoom.parent().on('mousewheel.focal', function( e ) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        $panzoom.panzoom('zoom', zoomOut, {
          increment: 0.1,
          animate: false,
          focal: e
        });
      });
    };

    return Annotations;

  })();

  $(function() {
    return new Annotations({});
  });

}).call(this);
