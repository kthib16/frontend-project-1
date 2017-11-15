(function() {
    function AlbumCtrl($rootScope, Fixtures, SongPlayer){
        //this.albumData = Fixtures.getAlbum();
        //this.AlbumData = Fixtures.currentAlbum;
        this.AlbumData = $rootScope.currentAlbum;
        this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['$rootScope','Fixtures', 'SongPlayer', AlbumCtrl]);
})();
