(function(){
    function PlayerBarCtrl($rootScope, Fixtures, Metric, SongPlayer){
        this.albumData = $rootScope.currentAlbum;
        this.songPlayer = SongPlayer;
        this.metric = Metric;
    }

    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['$rootScope', 'Fixtures', 'Metric', 'SongPlayer', PlayerBarCtrl]);
})();
