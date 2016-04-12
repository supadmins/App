angular.module('yyzWebApp')
    .controller('myInvitationCodeCtrl', ['$scope', 'invite', function ($scope, invite) {
        invite.inviteFriends().success(function (data) {
            if(data.ResultStatus) {
                $scope.firends = data.ResultObject.InvitedGodList;
                $scope.count = data.ResultObject.InvitedCount;
            }
        });
    }]);
