

 var app = angular.module('mangaShopApp', ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider.state('dashboard', {
			url: '/dashboard',
			controller: 'mangaShopCtrl',
			templateUrl: 'templates/dashboard.html'
		})
		$stateProvider.state('dashboard.mangaShop', {
			url: '/mangaShop',
			templateUrl: 'templates/mangaShop.html'
		})
		.state('dashboard.reviewItems', {
			url: '/review_items',
			templateUrl: 'templates/review.html'
		})
        .state('dashboard.checkout', {
            url: '/checkout',
            templateUrl: 'templates/checkout.html'
        })
	$urlRouterProvider.otherwise('/dashboard/mangaShop');
}]);
	app.controller('mangaShopCtrl', function ($scope, $http, $state) {
		$scope.cart = [];

		// Load products from server
		$http.get('products.json').success(function (response) {
			$scope.products = response.products;
			console.log('product json '+response);
		});
		$scope.add = function(product){
			if(product.quantity>10)
				alert("only 10 copies for one order");
			product.quantity+=1;
		}
		$scope.remove = function(product){
			if(product.quantity!=0)
				product.quantity-=1;
		}
		$scope.addToCart = function (product) {
			var found = false;
			$scope.cart.forEach(function (item) {
				if (item.id === product.id) {
					item.quantity++;
					found = true;
				}
			});
			if (!found) {
				if(product.quantity<=0)
					alert("please select quantity");
				else
				$scope.cart.push(angular.extend(product));
			}
		};
		$scope.removeFromCart = function (product) {
			product.quantity = 0;
			$scope.cart.pop(product);
			
		};

		$scope.getCartPrice = function () {
			var total = 0;
			$scope.cart.forEach(function (product) {
				total += product.price * product.quantity;
			});
			console.log($scope.cart);
			return total;
		};
		$scope.reviewItems = function(){
			console.log('the cart is: ', $scope.cart);
			$state.go('dashboard.reviewItems');
		};
		$scope.backToShop = function(){
			$state.go('dashboard.mangaShop');
		};
		$scope.getInvoice = function(){
			$state.go('dashboard.checkout');
		};
	});