angular.module('yyzWebApp')
    .controller('myBillCtrl', ['$scope', function ($scope) {
        $scope.content = true;
        $scope.houston = $scope.bill = false;
    }]);