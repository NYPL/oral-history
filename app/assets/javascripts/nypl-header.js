// assumes jquery
$(function() {
  var menuOn = false;
  var searchOn = false;

  $(document).mouseup(
    function (e) {
      var container = $("#nypl-search-top");
      var container2 = $("#nypl-navbar > li.search");

      if (searchOn && container.has(e.target).length === 0 && container2.has(e.target).length === 0) {
        searchOn = false;
        container.removeClass("visible");
      }

      container = $("#nypl-header");

      if (menuOn && container.has(e.target).length === 0) {
        menuOn = false;
        $("#nypl-navbar > li").removeClass("visible");
      }
    }
  );

  $("#nypl-search-toggle").click(
    function() {
      var c = $("#nypl-search-top");
      if (searchOn) {
        searchOn = false;
        c.removeClass("visible");
      } else {
        searchOn = true;
        c.addClass("visible");
      }
      return false;
    }
  );

  $("#nypl-menu-toggle").click(
    function() {
      var c = $("#nypl-navbar > li");
      if (menuOn) {
        menuOn = false;
        c.removeClass("visible");
      } else {
        menuOn = true;
        c.addClass("visible");
        // $("#nypl-search-top").show();
      }
      return false;
    }
  );

  $("#nypl-search-button-catalog").click(
    function() {
      $("#nypl-search-q").val($("#search-block-form-input").val());
      $("#nypl-search-block-form").attr("action", "http://nypl.bibliocommons.com/search");

      _gaq.push(['_trackEvent', 'Outbound Links', 'NYPL footer link', 'NYPL search catalog'])

      $("#nypl-search-block-form").submit();
      return false;
    }
  );

  $("#nypl-search-button-nypl").click(
    function() {
      $("#nypl-search-block-form").attr("action", "http://www.nypl.org/search/apachesolr_search/" + $("#search-block-form-input").val());
      $("#nypl-search-block-form").attr("method", "post");

      _gaq.push(['_trackEvent', 'Outbound Links', 'NYPL footer link', 'NYPL search site'])

      $("#nypl-search-block-form").submit();
      return false;
    }
  );

  // delayed hover
  var _id = 0;
  var _time = 500; // ms
  $("#nypl-navbar > li").hover(
    function (e) {
      // mouseover
      _id = setInterval(
        function () {
          clearInterval(_id);
          $(e.currentTarget).find("div").first().addClass("show");
        }
        , _time
      );
    }
    , function (e) {
      // mouseout
      $(e.currentTarget).find("div").first().removeClass("show");
      if (_id != 0) {
        clearInterval(_id);
      }
    }
  )

});