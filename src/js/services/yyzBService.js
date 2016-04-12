angular.module('yyzBServiceMod', [])
    .factory('address', ['$http', 'baseUrl', function ($http, baseUrl) {
        return {
            'getAddressList': function () {
                return $http.get(baseUrl + 'api/GodAddress');
            },
            'getAddressItem': function (id) {
                return $http.get(baseUrl + 'api/GodAddress?Id=' + id);
            },
            'addAddress': function (params) {
                return $http.post(baseUrl + 'api/GodAddress', params);
            },
            'editAddress': function (params) {
                return $http.put(baseUrl + 'api/GodAddress', params);
            },
            'deleteAddress': function (id) {
                return $http({ method: 'delete', data: { Id: id }, url: baseUrl + "api/GodAddress", headers: { 'Content-Type': 'application/json' } });
            },
            'setDefault': function (id) {
                return $http.post(baseUrl + 'api/GodAddress/SetDefault', { Id: id })
            }
        };
    }])
    .factory('collect', ['$http', 'baseUrl', function ($http, baseUrl) {
        return {
            'getCollectShopList': function () {
                return $http.get(baseUrl + 'api/CollectShop');
            },
            'collectShop': function (id) {
                return $http.post(baseUrl + 'api/CollectShop', {Id:id});
            },
            'cancelCollectShop': function (id) {
                return $http({ method: 'delete', data: { Id: id }, url: baseUrl + "api/CollectShop", headers: { 'Content-Type': 'application/json' } });
            },
            'getCollectProductList': function () {
                return $http.get(baseUrl + 'api/CollectProduct');
            },
            'collectProduct': function (id) {
                return $http.post(baseUrl + 'api/CollectProduct', { Id: id });
            },
            'cancelCollectProduct': function (id) {
                return $http({ method: 'delete', data: { Id: id }, url: baseUrl + "api/CollectProduct", headers: { 'Content-Type': 'application/json' } });
            }
        }
    }])