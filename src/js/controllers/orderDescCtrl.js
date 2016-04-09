angular.module('yyzWebApp')
    .controller('orderDescCtrl', ['$scope','$state', '$stateParams','order',
    function ($scope, $stateParams,order,$state) {
        $scope.logistics = $scope.logisticsView = false;
        $scope.id=$stateParams.id;
        if(!$scope.id){
            alert("��������");
            $state.go(-1);
            return;
        }
        $scope.$on('onselectUniqe', function () {
            $scope.logistics = !$scope.logistics;
            $scope.$apply();
        });

        $scope.express=[
            {"id":"1","name":"Բͨ���"},
            {"id":"2","name":"�°���"},
            {"id":"3","name":"���ٿ��"},
            {"id":"4","name":"EMS"}];
        $scope.expressName="Բͨ���";
        $scope.DeliveryNumber="";
        function initData(){
            order.($scope.id).success(function (data) {
                if (data.ResultStatus) {
                    $scope.items = data.ResultObject;
                } else {
                    alert(data.ResultMessage)
                }
            });
        };
        var params={
            Id:$scope.id,
            DeliveryNumber:$scope.DeliveryNumber,
            DeliveryCompany:$scope.expressName
        };
        //ȷ�Ϸ���
        $scope.ConfirmationDelivery=function(){
            order.ConfirmationDelivery(params).success(function(data){
                if (data.ResultStatus) {
                    alert("�����ɹ�");
                } else {
                    alert(data.ResultMessage)
                }
            });
        };


        $scope.cancel = function () {
            $scope.logisticsView = false;
        };
    }]);