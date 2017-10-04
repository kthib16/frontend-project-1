(function() {
        function SongPlayer(Fixtures) {
         var SongPlayer = {};


        /**
        *@desc Gets album info from the Fixtures file
        */
         var currentAlbum = Fixtures.getAlbum();

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
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
            SongPlayer.artist = currentAlbum.artist;
         };

         var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
         };

         var pauseSong = function(song){
            currentBuzzObject.pause();
            song.playing = false;
         };

         var stopSong = function() {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
          };

        /**
        *@desc Returns the index of the current song
        */
         var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
         };


         /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
         SongPlayer.currentSong = null;


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
          SongPlayer.previous = function(song){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if(currentSongIndex < 0){
                stopSong();
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          };
          /**
          *@function next
          *@desc Sets the current song to the next song on the album
          *@param {Object} song
          */
          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if(currentSongIndex > currentAlbum.songs.length - 1){
              stopSong();
            }
            else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
          };

         return SongPlayer;
      }

      angular
          .module('blocJams')
          .factory('SongPlayer', ['Fixtures', SongPlayer]);
}) ();
