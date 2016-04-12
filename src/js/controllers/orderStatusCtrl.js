angular.module('yyzWebApp')
    .controller('orderStatusCtrl',  ['$scope', '$http', 'order', '$location', '$stateParams', '$state',
        function ($scope, $http, order, $location, $stateParams, $state) {
            $scope.id=$stateParams.id;
            if(!$scope.id){
                alert("²ÎÊý´íÎó");
                history.go(-1);
                return;
            }
            initData();
            function initData() {
                order.orderStausInfo($scope.id).success(function (data) {
                    if (data.ResultStatus) {
                        $scope.items = data.ResultObject;
                    } else {
                        history.go(-1);
                        alert(data.ResultMessage);
                    }
                });
            }
            $scope.showContent = function () {
                $scope.contentView = true;
                $scope.searchView = false;
            };
        }]);