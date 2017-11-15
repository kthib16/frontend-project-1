(function(){
    function PlayerBarCtrl($rootScope, Fixtures, SongPlayer){
        //this.albumData = Fixtures.getAlbum();
        this.albumData = $rootScope.currentAlbum;
        this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['$rootScope', 'Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();
