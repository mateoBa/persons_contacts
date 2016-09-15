
var contact_controller = angular.module('contacts.controllers', []);

contact_controller.controller('addPersonContact', ['$scope', 'contactService', 'persons',
                                                    function($scope, contactService, persons) {

    $scope.person = {};
    $scope.person.contacts = [];
    $scope.contact = {};
    contactService.getContactTypes().then(
        function(res) {
            $scope.contact_types = res.data;
        },
        function(res){
            alert('An error occurred in server');
        }

    )

    //////////////////////////////////// Contacts ///////////////////////////
    $scope.submit_contact = function(contact){
        if (contact.value && contact.contact_type){
            var is_not = true;
            for (var co in $scope.person.contacts){
                var opt = $scope.person.contacts[co];
                if (opt['value'] == contact.value) {
                    is_not = false;
                    break;
                }
            }
            if (is_not) {
                $scope.person.contacts.push({contact_type: contact.contact_type, value: contact.value});
                $scope.contact.contact_type = '';
                $scope.contact.value = '';
            }
        }
    }

    $scope.delete_item = function(idx){
        $scope.person.contacts.splice(idx, 1);
    }
    ///////////////////// valid form ////////////////////////////////
    $scope.form_valid = function(){
        return ($scope.person.first_name && $scope.person.last_name && $scope.person.address &&
                $scope.person.birth_date && $scope.person.contacts.length > 0);
    }

    ///////////////////////////////////// save person and contacts /////////////////////////////

    $scope.submit = function(person){
        console.log('submit de persona-----');
        console.log(person);
        persons.save({}, person, function(res){
                alert(res);
        })
    }
}]);

contact_controller.controller('personsCtrl', ['$scope', 'persons',
                                               function($scope, persons) {
    $scope.promotions = [];
    $scope.entries = [];
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.bigTotalItems = 0;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = 10;

    function make_query(page) {
        var query = {
            'page_size': $scope.itemsPerPage
        };
        page = page || 1;
        query['page'] = page;

        persons.query(query, function(results){
            console.log(results);
            console.log(results.$meta.count);
            $scope.persons = results;
            $scope.totalItems = results.$meta.count;
            $scope.bigTotalItems = results.$meta.count;
        });
    }
    $scope.pageChanged = function() {
        make_query($scope.bigCurrentPage);
    };
    make_query(1);
}]);
