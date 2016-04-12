angular.module('yyzWebApp')
    .controller('myYyzCtrl', ['$scope', '$state', '$rootScope', 'navBar', function ($scope, $state, $rootScope, navBar) {
        $scope.switch = function () {
            $rootScope.customer = !$scope.customer;
            $rootScope.seller = !$scope.seller;
            if($rootScope.fname ==  '去卖家中心') {
                $rootScope.fname =  '去买家中心';
            }else {
                $rootScope.fname =  '去卖家中心';
            }

            if($rootScope.navBar == navBar.seller) {
                $rootScope.navBar = navBar.customer;
            }else {
                $rootScope.navBar = navBar.seller;
            }
        }
    }]);