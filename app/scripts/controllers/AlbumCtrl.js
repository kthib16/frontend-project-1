(function() {
    function AlbumCtrl($rootScope, Metric, SongPlayer){
        this.albumData = $rootScope.album;
        this.songPlayer = SongPlayer;
        this.registerSongPlay = songObj;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['$rootScope', 'Metric', 'SongPlayer', AlbumCtrl]);
})();
