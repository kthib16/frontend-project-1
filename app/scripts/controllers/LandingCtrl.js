(function() {
    function LandingCtrl() {
        this.heroTitle = "A jam for every block";
    }

    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();
