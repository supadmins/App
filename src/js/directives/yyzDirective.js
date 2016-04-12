angular.module('yyzDirectiveMod', ['oc.lazyLoad'])
    .directive('yyzBanner', ['$http', '$timeout', '$ocLazyLoad', 'baseUrl', function ($http, $timeout, $ocLazyLoad, baseUrl) {
        return {
            restrict: 'E',
            scope: true,
            transclude: true,
            template: '<div class="slide" id="slide"><ul><li ng-repeat="banner in banners">'               +
            '<a ng-href="{{banner.Url}}"><img ng-src="imgs/home/banner.png" alt=""></a>'                 +
            '</li></ul><div class="dot"><span ng-repeat="banner in banners"></span></div></div>',
            replace: true,
            link: function (scope, element, attrs) {
                var apiUrl = baseUrl + attrs['api'];
                $http.get(apiUrl).success(function (data) {
                    if(data.ResultStatus) {
                        scope.banners = data.ResultObject;
                    }
                });
                /*使用$timeout延迟 等待dom树结构生成->绑定DOM事件*/
                $timeout(function () {
                    $ocLazyLoad.load("lib/swipeSlide/swipeSlide.min.js")
                        .then(function () {
                            $('#slide').swipeSlide({
                                continuousScroll:true,
                                speed : 3000,
                                transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                                firstCallback : function(i,sum,me){
                                    me.find('.dot').children().first().addClass('cur');
                                },
                                callback : function(i,sum,me){
                                    me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                                }
                            });
                        });
                }, 300);
            }
        }
    }])
    .directive('yyzDropload', ['$http', '$ocLazyLoad', function ($http, $ocLazyLoad) {
        return {
            restrict: 'A',
            template: '<div ng-transclude></div>',
            transclude: true,
            replace: true,
            link: function (scope, element, attrs) {
                $ocLazyLoad.load("lib/dropload/dist/dropload.min.js")
                    .then(function () {
                        $(element[0]).dropload({
                            scrollArea: window,
                            domDown: {
                                domRefresh : '<div class="dropload-load"><div class="loading"></div>努力加载中...</div>'
                            },
                            loadDownFn: function (me) {
                                scope.$emit('onDropload', me);
                                me.resetload();
                            }
                        });
                    });
            }
        }
    }])
    .directive('yyzTimelimiter', ['$interval', function ($interval) {
        return {
            restrict: 'E',
            scope: true,
            template: '<div class="timeLimiter"><span ng-bind="hour"></span>:<span ng-bind="min"></span>:<span ng-bind="sec"></span></div>',
            resplace: true,
            link: function (scope, element, attrs) {
                var endTime = new Date(attrs['endTime']),
                    counter = function () {
                        var now = new Date(),
                            diff = endTime.getTime() - now.getTime();
                        scope.hour = Math.floor(diff/ 1000 / 3600);
                        scope.min = Math.floor((diff / 1000 / 3600 - scope.hour) * 60);
                        scope.sec = Math.floor((diff / 1000 - scope.hour * 3600 - scope.min * 60));
                        if(scope.hour.toString().length == 1) scope.hour = '0' + scope.hour;
                        if(scope.min.toString().length == 1) scope.min = '0' + scope.min;
                        if(scope.sec.toString().length == 1) scope.sec = '0' + scope.sec;

                        if(scope.sec === 0) {
                            scope.$emit('activityEnd');
                            if(interval) {
                                $interval.cancel(interval);
                            }
                        }
                    };
                counter();

                var interval = $interval(function () {
                    counter();
                }, 1000);
            }
        }
    }])
    .directive('yyzUpload', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var selector = attrs['yyzUpload'],
                    fileElement = document.querySelector(selector),
                    $ele = $(element[0]);

                $ele.click(function ($event) {
                    fileElement.click();
                    scope.$apply();
                });
            }
        }
    })
    .directive('yyzVouchers', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function (e) {
                    if(element.html().toString().indexOf('领取成功') == -1) {
                        element.css('opacity', 0.5);
                        var html = '<div style="color: #ff9d06; font-size: 0.28rem; margin-top: 0.4rem; text-align: center">领取成功</div>';
                        element.append(html);
                    }
                })
            }
        }
    })
    .directive('yyzSelectMulti', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.multiData = [];

                var target = attrs['yyzSelectMulti'].toUpperCase(),
                    nodeName = element[0].nodeName;

                $(element[0]).click(function () {
                    var key = $(this).data('key'),
                        index = scope.multiData.indexOf(key);

                    if(target !== nodeName) {
                        $(this).find(target).toggleClass('on');
                    }else {
                        $(this).toggleClass('on');
                    }

                    if(index > -1) {
                        scope.multiData.splice(index, 1);
                    }else {
                        scope.multiData.push(key);
                    }
                    scope.$emit('onselectMulti', scope.multiData);
                });
            }
        }
    })
    .directive('yyzSelectUniqe', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var target = attrs['yyzSelectUniqe'].toUpperCase(),
                    nodeName = element[0].nodeName;

                $(element[0]).click(function () {
                    var key = $(this).data('key');
                    if(target !== nodeName) {
                        $(this).find(target).toggleClass('on');
                    }else {
                        $(this).addClass('on');
                        $(this).siblings().removeClass('on');
                    }

                    scope.$emit('onselectUniqe', key);
                });
            }
        }
    })
    .directive('yyzDelete', ['$document', function ($document) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                var selector = attrs['yyzDelete'],
                    $ele = $(element[0]);

                $ele.click(function ($event) {
                    $event.stopPropagation();
                    $ele.parent('.left')
                        .css({
                            'transform': 'translateX(-1.16rem)',
                            '-webkit-transform': 'translateX(-1.16rem)'
                        });
                    $ele.parents('li').find(selector)
                        .css({
                            'width': '1.16rem'
                        });

                    scope.delete = true;
                });

                $document.on('click', function () {
                    if(scope.delete) {
                        $ele.parent('.left')
                            .css({
                                'transform': 'translateX(0)',
                                '-webkit-transform': 'translateX(0)'
                            });
                        $ele.parents('li').find(selector)
                            .css({
                                'width': '0'
                            });
                    }
                })
            }
        }
    }])
    .directive('yyzPhone', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                $(element[0]).on('blur', function () {
                    var phoneNumber = ngModelCtrl.$modelValue;
                    if(!/^1\d{10}$/.test(phoneNumber)) {
                        ngModelCtrl.$setValidity('phone', false);
                    }else {
                        ngModelCtrl.$setValidity('phone', true);
                    }
                    scope.$apply();
                })
            }
        };
    })
    .directive('yyzMasker', function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                element.on('click', function (event) {
                    if(event.target.className.toString().indexOf('masker') > -1) {
                        scope.$emit('maskerClick');
                    }
                })
            }
        };
    })
    .directive('yyzScrollSpy', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
        return {
            'restrict': 'A',
            link: function (scope, element, attrs) {
                $(element[0]).on('scroll', function () {
                    var scrollTop = $(element[0]).scrollTop(),
                        selector = attrs['yyzScrollSpy'],
                        spyEle = $(selector).height(),
                        index = Math.round(scrollTop / spyEle),
                        parentEle = $(selector).eq(index).parent(),
                        scopeObj = angular.element(parentEle[0]).scope(),
                        category = scopeObj.item.ShopProductTypeName,
                        id = scopeObj.item.Id;

                    scope.$apply(function () {
                        scope.category = category;
                        $location.hash(id);
                        $anchorScroll();
                    });
                });
            }
        };
    }])
    .directive('yyzPos', ['$ocLazyLoad', '$rootScope', function ($ocLazyLoad, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $ocLazyLoad.load('lib/map/map.js')
                    .then(function () {
                        if(!$rootScope.BMap) {
                            $rootScope.BMap = BMap;
                        }
                        var geolocation = new BMap.Geolocation();
                        geolocation.getCurrentPosition(function (r) {
                            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                                var posData = {
                                    longitude: r.point.lng,
                                    latitude: r.point.lat
                                };
                                scope.$emit('onpos', posData);
                            }
                            else {
                                alert('获取位置信息失败:' + this.getStatus());
                            }
                        }, {
                            enableHighAccuracy: true
                        });
                    });
            }
        };
    }])
    .value('baseUrl', 'http://112.74.126.176:8899/');




