(function () {
    function Fixtures ($rootScope, $document) {
      var Fixtures = {};

      var albumPicasso = {
        title: 'The Colors',
        artist: 'Pablo Picasso',
        label: 'Cubism',
        year: '1881',
        albumArtUrl: '/assets/images/album_covers/01.png',
        songs: [
          { title: 'Blue', duration: 161.71, audioUrl: 'assets/music/the_colors/blue'},
          { title: 'Green', duration: 103.96, audioUrl: 'assets/music/the_colors/green'},
          { title: 'Red', duration: 268.45, audioUrl: 'assets/music/the_colors/red' },
          { title: 'Pink', duration: 153.14, audioUrl: 'assets/music/the_colors/pink' },
          { title: 'Magenta', duration: 374.22, audioUrl: 'assets/music/the_colors/magenta' }
        ]
      };

      var albumMarconi = {
        title: 'The Telephone',
        artist: 'Guglielmo Marconi',
        label: 'EM',
        year: '1909',
        albumArtUrl: '/assets/images/album_covers/20.png',
        songs: [
          { title: 'Hello, Operator?', duration: 161.71, audioUrl: 'assets/music/the_telephone/01_operator' },
          { title: 'Ring, ring, ring', duration: 103.96, audioUrl: 'assets/music/the_telephone/02_ring' },
          { title: 'Fits in your pocket', duration: 268.45, audioUrl: 'assets/music/the_telephone/03_pocket' },
          { title: 'Can you hear me now?', duration: 153.14, audioUrl: 'assets/music/the_telephone/04_hear' },
          { title: 'Wrong phone number', duration: 374.22, audioUrl: 'assets/music/the_telephone/05_number' }
        ]
      };
      var albums = [albumPicasso, albumMarconi];

      /*Fixtures.getAlbum = function(albumTitle){
        console.log(albumTitle);
        var album = '';
        for(var i = 0; i < albums.length; i++){
          if(albums[i].title === albumTitle){
            album = albums[i];
          }
        }
        return album;
      };*/

      Fixtures.getAlbum = function(albumTitle){
        $rootScope.album = '';
        for(var i = 0; i < albums.length; i++){
          if(albums[i].title === albumTitle){
            $rootScope.album = albums[i];
          }
        }
      };

      Fixtures.getCollection = function(){
        return albums
      };

      return Fixtures;
    }

    angular
        .module('blocJams')
        .factory('Fixtures', ['$rootScope', '$document', Fixtures]);
})();
