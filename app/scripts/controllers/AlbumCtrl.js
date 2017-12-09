(function() {
    function AlbumCtrl($rootScope, Metric, SongPlayer){
        this.albumData = $rootScope.album;
        this.songPlayer = SongPlayer;
        this.metric = Metric;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['$rootScope', 'Metric', 'SongPlayer', AlbumCtrl]);
})();
