(function() {
  function Metric($rootScope, Fixtures) {
    $rootScope.songPlays = [];
    $rootScope.albumPlays = [];
    $rootScope.artistPlays = [];

    (function getAllSongs(){
      for(var i = 0; i < Fixtures.albums.length; i++){
        for(var j = 0; j < Fixtures.albums[i].songs.length; j++){
          var songTitle = Fixtures.albums[i].songs[j].title;
          $rootScope.songPlays.push({
            title: songTitle,
            plays: 0
          });
        }
      }
    })();

    return {
      // Function that keeps track of the number of times each song is played
      counter: function(songObj){
        var songNumber = 0;
        var albumNumber = 1;
        var artistNumber = 1;

        if($rootScope.songPlays){
          for(var i = 0; i < $rootScope.songPlays.length; i++){
            if($rootScope.songPlays[i].title === songObj.title){
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

        /* storing the number of times an individual song has been played on each song object is okay,
        but we don't really need every song object to contain the number of album and artist plays.
        consider only having this data on the rootScope. */

        songObj['albumPlays'] = albumNumber;
        songObj['artistPlays'] = artistNumber;
        console.log("songPlays is " + songObj['songPlays'] + ", albumPlays is " + songObj['albumPlays'] + " artistPlays is " + songObj['artistPlays']);
      },
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        // Add time to event register
        songObj['playedAt'] = new Date();
        $rootScope.songPlays.some(function(song){
          if(song.title === songObj.title){
            song.plays += 1;
            console.log("Added one to " + song.title);
            console.log($rootScope.songPlays);
            return true;
          }
        });
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
