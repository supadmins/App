angular.module('yyzWebApp')
    .controller('eshopCtrl', ['$scope', '$http', '$location', '$anchorScroll', 'eshop', '$stateParams',
        function ($scope, $http, $location, $anchorScroll, eshop, $stateParams) {
            $scope.goodsView = true;
            $scope.cartView = $scope.vouchersView = $scope.specView = $scope.commentsView = $scope.shopMessageView =false;

            var shopParams = {
                shopId: $stateParams.id || 1
            };

            var shopCommentParams = {
                shopId: $stateParams.id || 1
            };

            eshop.getShopData(shopParams).success(function (data) {
                if(data.ResultStatus) {
                    $scope.shopData = data.ResultObject;
                    $scope.category = data.ResultObject[0].ShopProductTypeName;
                }
            });

            eshop.getComments(shopCommentParams).success(function (data) {
                if(data.ResultStatus) {
                    $scope.commentList = data.ResultObject.ShopGodCommentViewModelList;
                }
            });

            $scope.showCartInfo = function () {
                $scope.cartView = !$scope.cartView;
            };

            $scope.showVouchers = function () {
                $scope.cartView = false;
                $scope.vouchersView = true;
            };

            $scope.hideVouchers = function () {
                $scope.vouchersView = false;
            };

            $scope.showSpec = function () {
                $scope.specView = true;
            };

            $scope.hideSpec = function () {
                $scope.specView = false;
            };

            $scope.closeMessageView = function () {
                $scope.shopMessageView = false;
            };

            $scope.showMessageView = function () {
                $scope.shopMessageView = true;
            };

            $scope.showGoods = function (item) {
                $scope.category = item.ShopProductTypeName;
                $location.hash(item.ShopProductTypeName);
                $anchorScroll();
            };

            $scope.$on('maskerClick', function () {
                $scope.cartView = false;
                $scope.$apply();
            });

            $scope.$on('onselectUniqe', function () {
                $scope.goodsView = !$scope.goodsView;
                $scope.commentsView = !$scope.commentsView;
                $scope.$apply();
            });

            $scope.$on('onDropload', function () {

            });
    }]);

















