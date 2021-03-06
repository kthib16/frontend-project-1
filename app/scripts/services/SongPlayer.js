(function() {
        function SongPlayer($rootScope, Fixtures, Metric) {
         var SongPlayer = {};


        /**
        *@desc Gets album info from the $rootScope
        */
         var currentAlbum = $rootScope.album;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         SongPlayer.artist = null;




         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
                SongPlayer.currentSong.paused = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function(){
                $rootScope.$apply(function(){
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
            SongPlayer.artist = $rootScope.album.artist;
            Metric.counter(song);
            Metric.registerSongPlay(song);
            Metric.registerAlbumInfo(song);
         };

         var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
         };

         var pauseSong = function(song){
            currentBuzzObject.pause();
            song.playing = false;
            song.paused = true;
         };

         var stopSong = function() {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
              SongPlayer.currentSong.paused = null;
          };

        /**
        *@desc Returns the index of the current song
        */
         var getSongIndex = function(song){
            return $rootScope.album.songs.indexOf(song);
         };


         /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
         SongPlayer.currentSong = null;
         /**
         *@desc Current playback time (in seconds) of currently playing song
         *@type {Number}
         */
         SongPlayer.currentTime = null;

         /**
         *@desc Current volume of the currently playing song
         *@type {Number} between 0 and 100
         */
         SongPlayer.volume = 50;

         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
               setSong(song);
               playSong(song);
             }

             else if(SongPlayer.currentSong === song) {
               if(currentBuzzObject.isPaused()){
                 playSong(song);
               }
             }
           };

         /**
         * @function pause
         * @desc Pause current song
         * @param {Object} song
         */
         SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            pauseSong(song);
          };
          /**
          *@function previous
          *@desc Sets the current song to the previous song on the album
          *@param {Object} song
          */
          SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if(currentSongIndex < 0){
                currentSongIndex = $rootScope.album.songs.length - 1;
            }
            var song = $rootScope.album.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          };
          /**
          *@function next
          *@desc Sets the current song to the next song on the album
          *@param {Object} song
          */
          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if(currentSongIndex > $rootScope.album.songs.length - 1){
              currentSongIndex = 0;
            }
            var song = $rootScope.album.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          };

          /**
          *@function setCurrentTime
          *@desc Set current time (in seconds) of currently playing song
          *@param {Number} time
          */
          SongPlayer.setCurrentTime = function(time){
            if(currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
          };

          /**
          *@function setVolume
          *@desc Sets the volume of the currently playing song
          *@param {Number} between 0 and 100
          */
          SongPlayer.setVolume = function(volume){
            if(currentBuzzObject){
              currentBuzzObject.setVolume(volume);
            }
          };

         return SongPlayer;
      }

      angular
          .module('blocJams')
          .factory('SongPlayer', ['$rootScope', 'Fixtures', 'Metric', SongPlayer]);
}) ();
