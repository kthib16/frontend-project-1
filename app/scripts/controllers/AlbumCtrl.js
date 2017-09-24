(function() {
    function AlbumCtrl(){
        this.albumData = [];
        this.albumData.picasso = albumPicasso;
        return this.albumData.picasso;
    }
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
