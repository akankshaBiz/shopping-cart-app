var app = angular.module('petShopApp');

app.factory('Cart', ['$rootScope', function ($rootScope) {
	var cartService = {};
    
    cartService.getCart = function(){};

    cartService.addItem = function(){};

    cartService.addItems = function() {};

    cartService.save = function() {};

    cartService.remove = function () {};

    cartService.clear = function() {};

    cartService.persist = function() {};

    cartService.changeQuantity = function (){};

    cartService.refresh = function() {};

    return cartService;
    }]);