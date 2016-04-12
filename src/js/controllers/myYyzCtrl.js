angular.module('yyzWebApp')
    .controller('myYyzCtrl', ['$scope', '$state', '$rootScope', 'navBar', function ($scope, $state, $rootScope, navBar) {
        $scope.customer = true;
        $scope.seller = false;
        $scope.fname = '去卖家中心';

        $scope.switch = function () {
            $scope.customer = !$scope.customer;
            $scope.seller = !$scope.seller;
            if($scope.fname ==  '去卖家中心') {
                $scope.fname =  '去买家中心';
            }else {
                $scope.fname =  '去卖家中心';
            }

            if($rootScope.navBar == navBar.seller) {
                $rootScope.navBar = navBar.customer;
            }else {
                $rootScope.navBar = navBar.seller;
            }
        }
    }]);