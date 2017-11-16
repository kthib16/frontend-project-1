(function() {
    function LandingCtrl() {
        this.heroTitle = "A Jam for every block";
    }

    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();
