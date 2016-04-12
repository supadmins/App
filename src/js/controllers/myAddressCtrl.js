angular.module('yyzWebApp')
    .controller('myAddressCtrl', ['$scope', '$http', '$state', 'addressHelper', 'address', function ($scope, $http, $state, addressHelper, address) {

        initShowView();
        $scope.editAddress = function (item) {
            $scope.contentView = false;
            $scope.editView = true;
            $scope.title = '编辑地址';
            $scope.fname = '保存';
            //addressHelper.addressItem =
            $scope.model = item;
            addressHelper.showView = "editView";
        };

        $scope.back = function () {
            if (!$scope.contentView) {
                $scope.title = '我的收货地址';
                $scope.fname = '新增地址';
                $scope.contentView = true;
                $scope.editView = $scope.addView = false;
            }
        };

        $scope.fn = function () {
            if ($scope.fname == '新增地址') {
                addressHelper.showView = "addView";
                $scope.contentView = $scope.editView = false;
                $scope.addView = true;
                $scope.fname = '保存';
            }
            else {
                var paramsModel = {};
                if ($scope.model) {
                    paramsModel = $scope.model;
                }
                else {
                    var params = {
                        Receiver: $scope.Receiver,
                        Sex: 1,
                        LocateAddress: $scope.LocateAddress,
                        Address: $scope.Address,
                        PhoneNumber: $scope.PhoneNumber
                    }
                    paramsModel = params;
                }
                saveAddress(paramsModel);
            }
        };

        //获取列表
        function getMyAddressList() {
            address.getAddressList().success(function (data) {
                if (data.ResultStatus) {
                    $scope.items = data.ResultObject;
                } else {
                    alert("请求失败");
                }
            });
        }

        //保存地址
        function saveAddress(model) {
            if (model.Id) {
                address.editAddress(model).success(function (data) {
                    if (data.ResultStatus) {
                        alert("成功");
                    } else {
                        alert("失败");
                    }
                })
            }
            else {
                address.addAddress(model).success(function (data) {
                    if (data.ResultStatus) {
                        alert("成功");
                    } else {
                        alert("失败");
                    }
                })
            }
        }

        //删除地址
        $scope.deleteAddress = function (id) {
            address.deleteAddress(id).success(function (data) {
                if (data.ResultStatus) {
                    alert("成功");
                } else {
                    alert("失败");
                }
            })
        }

        function initShowView() {
            if (addressHelper.showView == 'addView') {
                addressHelper.addressItem.LocateAddress = addressHelper.searchViewValue;
                $scope.model = addressHelper.addressItem;
                $scope.addView = true; $scope.contentView = $scope.edit = false;
                $scope.fname = '保存';
            }
            else if (addressHelper.showView == 'editView') {
                addressHelper.addressItem.LocateAddress = addressHelper.searchViewValue;
                $scope.model = addressHelper.addressItem;
                $scope.editView = true; $scope.contentView = $scope.addView = false;
                $scope.title = '编辑地址';
                $scope.fname = '保存';
            }
            else {
                $scope.title = '我的收货地址';
                $scope.fname = '新增地址';
                $scope.contentView = true;
                $scope.addView = false;
                getMyAddressList();
            }

        }

        //跳转到地址定位页面
        $scope.linkSearch = function () {
            addressHelper.addressItem = $scope.model;
            $state.go("search");
        }
    }]);