angular.module('yyzWebApp', [
    'ui.router', 'oc.lazyLoad', 'yyzDirectiveMod', 'yyzServiceMod', 'yyzAServiceMod',
    'yyzBServiceMod'])
    .run(['$rootScope', '$window', '$state', function ($rootScope, $window, $state) {
        //注册路由变更事件
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $window.scrollTo(0, 0);

            //在state上强制刷新页面
            if(fromState.name !== '') {
                $rootScope.stateName = fromState.name;
                $rootScope.stateParams = fromParams;
            }
            if(!$state.back) {
                $state.back = function () {
                    $state.go($rootScope.stateName, $rootScope.stateParams);
                };
            }
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push('interceptor');
        //默认路由
        $urlRouterProvider.otherwise("/");

        $stateProvider
            //首页
            .state('index', {
                url: "/",
                views: {
                    "lazyLoadView": {
                        controller: 'homeCtrl',
                        templateUrl: 'partials/home.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/homeCtrl.js');
                    }]
                }
            })
            //订单列表
            .state('orderList', {
                url: "/orderList",
                views: {
                    "lazyLoadView": {
                        controller: 'orderListCtrl',
                        templateUrl: 'partials/orderList.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', 'user', function ($ocLazyLoad, user) {
                        return $ocLazyLoad.load('js/controllers/orderListCtrl.js');
                    }]
                }
            })
            //我的一扬指
            .state('myYyz', {
                url: "/myYyz",
                views: {
                    "lazyLoadView": {
                        controller: 'myYyzCtrl',
                        templateUrl: 'partials/myYyz.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/myYyzCtrl.js');
                    }]
                }
            })
            //订单状态
            .state('orderStatus', {
                url: "/orderStatus",
                views: {
                    "lazyLoadView": {
                        controller: 'orderStatusCtrl',
                        templateUrl: 'partials/orderStatus.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/orderStatusCtrl.js');
                    }]
                }
            })
            //订单明细
            .state('orderDetail', {
                url: "/orderDetail?id",
                views: {
                    "lazyLoadView": {
                        controller: 'orderDetailCtrl',
                        templateUrl: 'partials/orderDetail.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/orderDetailCtrl.js');
                    }]
                }
            })
            //退货
            .state('returnGoods', {
                url: "/returnGoods",
                views: {
                    "lazyLoadView": {
                        controller: 'returnGoodsCtrl',
                        templateUrl: 'partials/returnGoods.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/returnGoodsCtrl.js');
                    }]
                }
            })
            //创建订单
            .state('createOrder', {
                url: "/createOrder",
                views: {
                    "lazyLoadView": {
                        controller: 'createOrderCtrl',
                        templateUrl: 'partials/createOrder.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/createOrderCtrl.js');
                    }]
                }
            })
            //登陆
            .state('login', {
                url: "/login",
                views: {
                    "lazyLoadView": {
                        controller: 'loginCtrl',
                        templateUrl: 'partials/login.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/loginCtrl.js');
                    }]
                }
            })
            //注册
            .state('register', {
                url: "/register",
                views: {
                    "lazyLoadView": {
                        controller: 'loginCtrl',
                        templateUrl: 'partials/login.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/loginCtrl.js');
                    }]
                }
            })
            //个人中心
            .state('personalCenter', {
                url: "/personalCenter",
                views: {
                    "lazyLoadView": {
                        controller: 'personalCenterCtrl',
                        templateUrl: 'partials/personalCenter.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/personalCenterCtrl.js');
                    }]
                }
            })
            //收货地址
            .state('deliverAddress', {
                url: "/deliverAddress",
                views: {
                    "lazyLoadView": {
                        controller: 'deliverAddressCtrl',
                        templateUrl: 'partials/deliverAddress.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/deliverAddressCtrl.js');
                    }]
                }
            })
            //e家店
            .state('eshop', {
                url: "/eshop?id",
                views: {
                    "lazyLoadView": {
                        controller: 'eshopCtrl',
                        templateUrl: 'partials/eshop.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/eshopCtrl.js');
                    }]
                }
            })
            //e家店列表
            .state('eshopList', {
                url: "/eshopList",
                views: {
                    "lazyLoadView": {
                        controller: 'eshopListCtrl',
                        templateUrl: 'partials/eshopList.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/eshopListCtrl.js');
                    }]
                }
            })
            //店铺详情
            .state('shopDetail', {
                url: "/shopDetail?id&pid",
                views: {
                    "lazyLoadView": {
                        controller: 'shopDetailCtrl',
                        templateUrl: 'partials/shopDetail.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/shopDetailCtrl.js');
                    }]
                }
            })
            //店铺信息
            .state('shopInfo', {
                url: "/shopInfo?id",
                views: {
                    "lazyLoadView": {
                        controller: 'shopInfoCtrl',
                        templateUrl: 'partials/shopInfo.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/shopInfoCtrl.js');
                    }]
                }
            })
            //我的全部订单
            .state('myAllOrder', {
                url: "/myAllOrder",
                views: {
                    "lazyLoadView": {
                        controller: 'myAllOrderCtrl',
                        templateUrl: 'partials/myAllOrder.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/myAllOrderCtrl.js');
                    }]
                }
            })
            //添加商品
            .state('addGoods', {
                url: "/addGoods",
                views: {
                    "lazyLoadView": {
                        controller: 'addGoodsCtrl',
                        templateUrl: 'partials/addGoods.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/addGoodsCtrl.js');
                    }]
                }
            })
            //订单信息
            .state('orderDesc', {
                url: "/orderDesc?id",
                views: {
                    "lazyLoadView": {
                        controller: 'orderDescCtrl',
                        templateUrl: 'partials/orderDesc.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/orderDescCtrl.js');
                    }]
                }
            })
            //我的退款订单
            .state('orderRefundList', {
                url: "/orderRefundList",
                views: {
                    "lazyLoadView": {
                        controller: 'orderRefundListCtrl',
                        templateUrl: 'partials/orderRefundList.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/orderRefundListCtrl.js');
                    }]
                }
            })
            //商品退货
            .state('refunding', {
                url: "/refunding?id",
                views: {
                    "lazyLoadView": {
                        controller: 'refundingCtrl',
                        templateUrl: 'partials/refunding.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/refundingCtrl.js');
                    }]
                }
            })
            //交易历史
            .state('consultHistory', {
                url: "/consultHistory",
                views: {
                    "lazyLoadView": {
                        controller: 'consultHistoryCtrl',
                        templateUrl: 'partials/consultHistory.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/consultHistoryCtrl.js');
                    }]
                }
            })
            //商品管理
            .state('goodsManage', {
                url: "/goodsManage",
                views: {
                    "lazyLoadView": {
                        controller: 'goodsManageCtrl',
                        templateUrl: 'partials/goodsManage.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/goodsManageCtrl.js');
                    }]
                }
            })
            //商品类型管理
            .state('goodsTypeManage', {
                url: "/goodsTypeManage",
                views: {
                    "lazyLoadView": {
                        controller: 'goodsTypeManageCtrl',
                        templateUrl: 'partials/goodsTypeManage.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/goodsTypeManageCtrl.js');
                    }]
                }
            })
            //选择商品类型
            .state('selectType', {
                url: "/selectType",
                views: {
                    "lazyLoadView": {
                        controller: 'selectTypeCtrl',
                        templateUrl: 'partials/selectType.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/selectTypeCtrl.js');
                    }]
                }
            })
            //商品类型
            .state('goodsTypeHelper', {
                url: "/goodsTypeHelper",
                views: {
                    "lazyLoadView": {
                        controller: 'goodsTypeHelperCtrl',
                        templateUrl: 'partials/goodsTypeHelper.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/goodsTypeHelperCtrl.js');
                    }]
                }
            })
            //添加评价
            .state('addEvaluate', {
                url: "/addEvaluate",
                views: {
                    "lazyLoadView": {
                        controller: 'addEvaluateCtrl',
                        templateUrl: 'partials/addEvaluate.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/addEvaluateCtrl.js');
                    }]
                }
            })
            //店铺管理
            .state('shopManagement', {
                url: "/shopManagement",
                views: {
                    "lazyLoadView": {
                        controller: 'shopManagementCtrl',
                        templateUrl: 'partials/shopManagement.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/shopManagementCtrl.js');
                    }]
                }
            })
            //店铺审核
            .state('shopExamine', {
                url: "/shopExamine",
                views: {
                    "lazyLoadView": {
                        controller: 'shopExamineCtrl',
                        templateUrl: 'partials/shopExamine.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/shopExamineCtrl.js');
                    }]
                }
            })
            //商家版所有订单
            .state('allOrder', {
                url: "/allOrder?id",
                views: {
                    "lazyLoadView": {
                        controller: 'allOrderCtrl',
                        templateUrl: 'partials/allOrder.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/allOrderCtrl.js');
                    }]
                }
            })
            //商家客户管理
            .state('customerManagement', {
                url: "/customerManagement",
                views: {
                    "lazyLoadView": {
                        controller: 'customerManagementCtrl',
                        templateUrl: 'partials/customerManagement.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/customerManagementCtrl.js');
                    }]
                }
            })
            //我的代金券
            .state('myVouchers', {
                url: "/myVouchers",
                views: {
                    "lazyLoadView": {
                        controller: 'myVouchersCtrl',
                        templateUrl: 'partials/myVouchers.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/myVouchersCtrl.js');
                    }]
                }
            })
            //我的评论
            .state('myComments', {
                url: "/myComments",
                views: {
                    "lazyLoadView": {
                        controller: 'myCommentsCtrl',
                        templateUrl: 'partials/myComments.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/myCommentsCtrl.js');
                    }]
                }
            })
            //我的收藏
            .state('myCollections', {
                url: "/myCollections",
                views: {
                    "lazyLoadView": {
                        controller: 'myCollectionsCtrl',
                        templateUrl: 'partials/myCollections.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/myCollectionsCtrl.js');
                    }]
                }
            })
            //我的邀请码
            .state('myInvitationCode', {
                url: "/myInvitationCode",
                views: {
                    "lazyLoadView": {
                        controller: 'myInvitationCodeCtrl',
                        templateUrl: 'partials/myInvitationCode.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/myInvitationCodeCtrl.js');
                    }]
                }
            })
            //我要提现
            .state('withdrawals', {
                url: "/withdrawals",
                views: {
                    "lazyLoadView": {
                        controller: 'withdrawalsCtrl',
                        templateUrl: 'partials/withdrawals.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/withdrawalsCtrl.js');
                    }]
                }
            })
            //账单流水
            .state('myBill', {
                url: "/myBill",
                views: {
                    "lazyLoadView": {
                        controller: 'myBillCtrl',
                        templateUrl: 'partials/myBill.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/myBillCtrl.js');
                    }]
                }
            })
            //我的收货地址
            .state('myAddress', {
                url: "/myAddress",
                views: {
                    "lazyLoadView": {
                        controller: 'myAddressCtrl',
                        templateUrl: 'partials/myAddress.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/myAddressCtrl.js');
                    }]
                }
            })
            //卖家角色选择
            .state('role', {
                url: "/role",
                views: {
                    "lazyLoadView": {
                        controller: 'roleCtrl',
                        templateUrl: 'partials/role.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/roleCtrl.js');
                    }]
                }
            })
            //代金券设置
            .state('vouchSettings', {
                url: "/vouchSettings",
                views: {
                    "lazyLoadView": {
                        controller: 'vouchSettingsCtrl',
                        templateUrl: 'partials/vouchSettings.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/vouchSettingsCtrl.js');
                    }]
                }
            })
            //地址搜索
            .state('search', {
                url: "/search",
                views: {
                    "lazyLoadView": {
                        controller: 'searchCtrl',
                        templateUrl: 'partials/search.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/searchCtrl.js');
                    }]
                }
            })
            //帮助文档
            .state('help', {
                url: "/help",
                views: {
                    "lazyLoadView": {
                        templateUrl: 'partials/help.html'
                    }
                }
            })
    }])
    //.value('baseUrl', 'http://localhost:8870/');
    .value('baseUrl', 'http://112.74.126.176:8899/');


