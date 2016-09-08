
var application = angular.module('persons-ngapp', [
    'ngRoute',

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
            when('/add_contact_to_person', {
                templateUrl: '/static/js/app/contacts/add_contact.html',
                controller: 'DashboardCtrl'
            }).
            otherwise({
                redirectTo: '/dashboard'
            });
}]);


application.config(['$resourceProvider',
                    function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
