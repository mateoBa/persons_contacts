
var contact_service = angular.module('contacts.services', []);

merchants.service('contactService', ['$http', function($http) {

    this.getContactTypes = function() {
        return $http({
            method: 'GET',
            url: '/contacts/contact_types/',
        });
    };
    this.createPersonContact = function(data) {
        return $http({
            method: 'PUT',
            url: '/api/v1/merchants/',
            data: data,
        });
    };
}]);