// Helper functions
(function() {
  window.helper = {};
  helper.makeId = function( length ){
    var text = "",
        alpha = "abcdefghijklmnopqrstuvwxyz",
        alphanum = "abcdefghijklmnopqrstuvwxyz0123456789",
    length = length || 8;
    for( var i=0; i < length; i++ ) {
      if ( i <= 0 ) { // must start with letter
        text += alpha.charAt(Math.floor(Math.random() * alpha.length));
      } else {
        text += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
      }
    }
    return text;
  };
  helper.round = function(num, dec) {
    num = parseFloat( num );
    dec = dec || 0;
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  };
  helper.formatTime = function( seconds, dec ) {
    var s = seconds || 0,
        h = parseInt( s / 3600 ) % 24,
        m = parseInt( s / 60 ) % 60,
        s = helper.round( s % 60, dec ),
        string;
    // create format hh:mm:ss
    string = (h > 0 ? h + ':' : '') + (m < 10 ? '0' + m : m ) + ':' + (s < 10 ? '0' + s : s);
    // remove starting zeros
    if ( string[0] == '0' ) string = string.substring(1, string.length);
    return string;
  };
  helper.getSeconds = function( string, dec ) {
    var parts = string.split(':').reverse(),
        seconds = 0;
    // go from hh:mm:ss to seconds
    for ( var i=parts.length-1; i>=0; i-- ) {
      switch( i ) {
        case 2: // hours
          seconds += parseInt( parts[i] ) * 60 * 60;
          break;
        case 1: // minutes
          seconds += parseInt( parts[i] ) * 60;
          break;
        case 0: // seconds
          seconds += parseFloat( parts[i] );
          break
        default:
          break;
      }
    }
    return helper.round( seconds, dec );
  };
  helper.matchUrl = function(url){
    var this_url = window.location.href,
        url_parts = url.split('//'),
        this_url_parts = this_url.split('//'),
        fixed_url = this_url_parts[0] + '//' + url_parts[1];

    return fixed_url;
  };
})();
