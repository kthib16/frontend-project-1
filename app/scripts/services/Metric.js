(function() {
  function Metric($rootScope) {
    $rootScope.songPlays = [];

    return {
      // Function that keeps track of the number of times each song is played 
      counter: function(songObj){
        var number = 1;
        if($rootScope.songPlays){
          for(var i = 0; i < $rootScope.songPlays.length; i++){
            if($rootScope.songPlays[i] === songObj){
              number += 1;
            }
          }
        }
        songObj['plays'] = number;
      },
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        // Add time to event register
        songObj['playedAt'] = new Date();
        console.log(songObj);
        console.log($rootScope.songPlays);
        $rootScope.songPlays.push(songObj);
      },
      listSongsPlayed: function() {
        var songs = [];
        angular.forEach($rootScope.songPlays, function(song) {
            songs.push(song.title);
        });
        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('Metric', ['$rootScope', Metric]);
})();
