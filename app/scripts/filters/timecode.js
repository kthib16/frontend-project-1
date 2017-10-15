(function() {
    function timecode() {
      return function(seconds){
      if(Number.isNaN(seconds)){
        return '--:--';
      }
      var time = buzz.toTimer(seconds);
      return time;
      }
    };

    angular
      .module('blocJams')
      .filter('timecode', ['SongPlayer', timecode]);
})();
