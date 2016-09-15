
var contact_service = angular.module('contacts.services', ['ngResource']);

contact_service.service('contactService', ['$http', function($http) {

    this.getContactTypes = function() {
        return $http({
            method: 'GET',
            url: '/api/v1/contact_types/',
        });
    };
}]);

contact_service.factory('persons', ['$resource',
  function($resource) {
    return $resource('/api/v1/persons/:personId', {}, {
      query: {
            method: "GET",
            isArray: true,
            transformResponse: function (data) {
                var wrappedResult = angular.fromJson(data);
                console.log('estoy en servicio');
                console.log(wrappedResult);
                var meta = {
                    'count': wrappedResult.count
                };
                wrappedResult.results.$meta = meta;
                return wrappedResult.results;
            },
            interceptor: {
                response: function (response) {
                    response.resource.$meta = response.data.$meta;
                    return response.resource;
                }
            }
      }
  });
}]);