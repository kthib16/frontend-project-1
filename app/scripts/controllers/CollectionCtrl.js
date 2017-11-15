(function() {
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection();
        //this.getAlbum = Fixtures.getAlbum();
   }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
