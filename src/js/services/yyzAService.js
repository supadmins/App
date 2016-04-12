angular.module('yyzAServiceMod', [])
    .factory('order', ['$http', 'baseUrl', function ($http, baseUrl) {
        return {
            'godorderlist': function (params) {
                params = params || {};
                return $http.get(baseUrl + 'api/Order/GodOrderList', {params: params});
            },
            'shoporderlist': function (params) {
                return $http.get(baseUrl + 'api/Order/ShopOrderList', {params: params});
            },
            'shopgodinfobygodid': function (params) {
                return $http.get(baseUrl + 'api/GodGroup/ShopGodInfoByGodId?godId='+params);
            },
            'confirmationdelivery': function (params) {
            return $http.post(baseUrl + 'api/Order/BusinessConfirmDelivery', params);
            },
            'shoporderlistbygodid': function (params) {
                return $http.get(baseUrl + 'api/Order/ShopOrderListByGodId', {params: params});
            },
            'orderdetail': function (params) {
            return $http.get(baseUrl + 'api/Order?id='+params);
            },
            'cancelOrder': function (params) {
                return $http.put(baseUrl + 'api/Order/GodCancelOrderForm',params);
            },
            'shopCancelOrder': function (params) {
                return $http.put(baseUrl + 'api/Order/ShopCancelOrderForm',params);
            },
            'orderStausInfo': function (params) {
                return $http.get(baseUrl + 'api/Order/OrderProcessLogInfo?id='+params);
            },
            'payOrder': function (params) {
                return $http.put(baseUrl + 'api/Order/GodCancelOrderForm',params);
            }

        };
    }]);















