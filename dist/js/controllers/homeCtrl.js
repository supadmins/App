angular.module('yyzWebApp')
    .controller('homeCtrl', ['$scope', '$http', 'User', function ($scope, $http, User) {
        $scope.shopList = [
            {'src': 'imgs/home/shop.jpg', 'content': 'angular下拉组件测试'},
            {'src': 'imgs/home/shop.jpg', 'content': 'angular下拉组件测试'},
            {'src': 'imgs/home/shop.jpg', 'content': 'angular下拉组件测试'}
        ];
    }]);