
var application = angular.module('persons-ngapp', [
    'ngRoute',
    'ngResource',

    //app
    'contacts',
]);

application.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

application.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/add_contact', {
                templateUrl: '/static/js/app/contacts/add_contact.html',
                controller: 'addPersonContact'
            }).
            otherwise({
                templateUrl: '/static/js/app/contacts/404.html',
                controller: 'addPersonContact'
            });
}]);


application.config(['$resourceProvider',
                    function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
