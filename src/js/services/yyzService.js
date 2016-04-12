angular.module('yyzServiceMod', [])
    .factory('util', ['$http', '$location', 'baseUrl', function ($http, $location, baseUrl) {
        return {
            getCode: function (params) {
                params = params || {};
                var url = baseUrl;

                if ($location.url().toString().indexOf('register') > -1) {
                    url = baseUrl + 'api/Comm/RegisterSmsCode?phoneNumber=' + params.phoneNumber + '&imgCode=' + params.imgCode;
                } else {
                    url = baseUrl + 'api/Comm/LoginSmsCode?phoneNumber=' + params.phoneNumber + '&imgCode=' + params.imgCode;
                }

                return $http.get(url);
            }
        };
    }])
    .factory('user', ['$http', 'baseUrl', function ($http, baseUrl) {
        return {
            hasLogin: false,
            register: function (params) {
                params = params || {};
                return $http.post(baseUrl + 'api/God/Register', params);
            },
            login: function (params) {
                params = params || {};
                return $http.post(baseUrl + 'api/God/Login', params);
            },
            logout: function () {
                return $http.post(baseUrl + 'api/God/Logout');
            }
        };
    }])
    .factory('interceptor', ['$q', '$rootScope', function ($q, $rootScope) {
        return {
            responseError : function (res) {
                var deferred = $q.defer(),
                    httpCode = res.status;

                if(httpCode == 401) {
                    if(!$rootScope.redirectUrl) {
                        $rootScope.redirectUrl = window.location.href;
                    }
                    window.location.href = '#/login';
                }
                deferred.resolve(res);

                return deferred.promise;
            }
        };
    }])
    .factory('validator', function () {
        return {
            phone: '电话号码格式不正确,请重新输入'
        };
    })
    .factory('productType', ['$http', 'baseUrl', function ($http, baseUrl) {
        return {
            getTypeList: function () {
                return $http.get(baseUrl + 'api/ShopProductType');
            },
            addType: function (params) {
                return $http.post(baseUrl + 'api/ShopProductType', params);
            }
        };
    }])
    .factory('addressHelper', function () {
        return {
            originState: '',
            searchViewValue: '',
            showView: '',
            getPoint: function () {
            },
            reset: function () {
                this.originState = '';
                this.searchViewValue = '';
            }
        };
    })
    .factory('eshop', ['$http', 'baseUrl', function ($http, baseUrl) {
        return {
            getShopData: function (params) {
                params = params || {};

                return $http.get(baseUrl + 'api/Product/ShopProductTypeAndProduct', {
                    params: params
                });
            },
            getComments: function (params) {
                params = params || {};

                return $http.get(baseUrl + 'api/Order/ShopGodCommentList', {
                    params: params
                });
            }
        };
    }])
    .factory('bill', ['http', 'baseUrl', function ($http, baseUrl) {
        return {

        };
    }])
    .factory('invite', ['$http', 'baseUrl', function ($http, baseUrl) {
        return {
            'inviteFriends': function () {
                return $http.get(baseUrl + 'api/God/GetMyInviteFriends');
            }
        };
    }])
    .factory('navBar', function () {
        return {
            customer: [
                {
                    'text': '首页',
                    'stateName': 'index'
                },
                {
                    'text': 'e家店',
                    'stateName': 'eshopList'
                },
                {
                    'text': '订单',
                    'stateName': 'orderList'
                },
                {
                    'text': '我的',
                    'stateName': 'myYyz'
                }
            ],
            seller: [
                {
                    'text': '小店',
                    'stateName': 'eshop'
                },
                {
                    'text': 'e进货',
                    'stateName': 'eshopList'
                },
                {
                    'text': '订单',
                    'stateName': 'orderList'
                },
                {
                    'text': '我的',
                    'stateName': 'myYyz'
                }
            ]
        };
    })
    .factory('home', ['$http', 'baseUrl', function ($http, baseUrl) {
        return {
            getShopList: function (params) {
                params = params || {};

                return $http.get(baseUrl + 'api/Comm/NearShopList', {
                    params: params
                });
            }
        };
    }]);














