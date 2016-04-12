angular.module('yyzWebApp')
    .controller('personalCenterCtrl', ['$scope', 'user', '$state', function ($scope, user, $state) {
        $scope.logout = function () {
            user.logout()
                .success(function (data) {
                    if(data.ResultStatus) {
                        $state.back();
                    }
                });
        };
    }]);