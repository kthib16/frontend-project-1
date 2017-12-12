(function() {
  function Metric($rootScope, Fixtures) {
    $rootScope.songPlays = [];
    $rootScope.albumPlays = [];
    $rootScope.artistPlays = [];

    (function getAllSongs(){
      for(var i = 0; i < Fixtures.albums.length; i++){
        for(var j = 0; j < Fixtures.albums[i].songs.length; j++){
          $rootScope.songPlays.push(Fixtures.albums[i].songs[j].title);
        }
      }
    })();

    return {
      // Function that keeps track of the number of times each song is played
      counter: function(songObj){
        var songNumber = 1;
        var albumNumber = 1;
        var artistNumber = 1;
        if($rootScope.songPlays){
          for(var i = 0; i < $rootScope.songPlays.length; i++){
            if($rootScope.songPlays[i] === songObj){
              songNumber += 1;
            }
          }
        }
        if($rootScope.albumPlays){
          for(var i = 0; i < $rootScope.albumPlays.length; i++){
            if($rootScope.albumPlays[i] === $rootScope.album.title){
              albumNumber += 1;
            }
          }
        }
        if($rootScope.artistPlays){
          for(var i = 0; i < $rootScope.artistPlays.length; i++){
            if($rootScope.artistPlays[i] === $rootScope.album.artist){
              artistNumber += 1;
            }
          }
        }

        songObj['songPlays'] = songNumber;
        songObj['albumPlays'] = albumNumber;
        songObj['artistPlays'] = artistNumber;
      },
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        // Add time to event register
        songObj['playedAt'] = new Date();
        console.log(songObj);
        console.log($rootScope.songPlays);
        $rootScope.songPlays.push(songObj);
      },
      registerAlbumInfo: function(songObj){
        songObj['artist'] = $rootScope.album.artist;
        songObj['album'] = $rootScope.album.title;
        $rootScope.albumPlays.push($rootScope.album.title);
        $rootScope.artistPlays.push($rootScope.album.artist);
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
    .service('Metric', ['$rootScope', 'Fixtures', Metric]);
})();
