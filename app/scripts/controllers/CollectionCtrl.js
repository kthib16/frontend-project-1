(function() {
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection();
        this.getAlbum = function(albumTitle){
          console.log(albumTitle);
          Fixtures.getAlbum(albumTitle);
        };
   }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
