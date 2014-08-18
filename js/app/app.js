var app = angular.module('d3-example', ['ui.router']);

app.controller('NavCtrl', function($scope, $location){
	$scope.nav = [
		{ url: '/', title: 'Home' },
		{ url: '/circles', title: 'Circles' },
		{ url: '/barchart', title: 'Barchart' },
		{ url: '/linechart', title: 'Linechart' },
		{ url: '/donut', title: 'Donut' },
		{ url: '/grid', title: 'Grid' },
		{ url: '/tree', title: 'Tree' },
		{ url: '/shapeCreation', title: 'Shape Creation' }
	];

	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
})

// Routes
app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html'
		})
		.state('circles', {
			url: '/circles',
			templateUrl: 'views/circles.html'
		})
		.state('barchart', {
			url: '/barchart',
			template: "<div class='barchartTarget'></div>"
		})
		.state('linechart', {
			url: '/linechart',
			template: "<div class='linechartTarget'></div>"
		})
		.state('donut', {
			url: '/donut',
			templateUrl: 'views/donut.html'
		})
		.state('grid', {
			url: '/grid',
			template: "<div class='row text-center'>" +
				"<div class='gridTarget'></div></div>"	
		})
		.state('tree', {
			url: '/tree',
			templateUrl: 'views/tree.html'
		})
		.state('shapeCreation', {
			url: '/shapeCreation',
			template: "<div class='shapeCreation'></div>"
		})

	$urlRouterProvider.otherwise('/')

})