angular.module('yyzWebApp')
    .controller('myCollectionsCtrl', ['$scope', 'collect', function ($scope, collect) {
        $scope.$on('onselectUniqe', function ($event, data) {
            alert(data);
            $scope.$apply();
        });
        getMyCollectShopList();
        function getMyCollectShopList()
        {
            return collect.getCollectShopList().success(function (data) {
                if (data.ResultStatus) {
                    $scope.items = data.ResultObject;
                } else {
                    alert("«Î«Û ß∞‹");
                }
            })
        }
    }]);

