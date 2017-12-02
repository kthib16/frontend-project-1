(function(){
    function Metric($rootScope){
        $rootScope.songPlays = [];
        return {
            //Function that records a metric objects by pushing it to the $rootScope array
            registerSongPlay: function(songObj){
                //Add time to event register
                songObj['playerAt'] = new Date();
                $rootScope.songPlays.push(songObj);
              },
              listSongsPlayed: function(){
                var songs = [];
                angular.forEach($rootScope.songPlays, function(song){
                    songs.push(song.title);
                });
                return songs;
              }
        };
    }

    angular
        .module('blocJams');
        .factory('Metric', ['$rootScope', Metric]);
})();
