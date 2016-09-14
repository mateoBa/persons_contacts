
var contact_controller = angular.module('contacts.controllers', []);

contact_controller.controller('addPersonContact', ['$scope', '$filter', 'contactService', 'persons',
                                                    function($scope, $filter, contactService, persons) {

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
        console.log('add contact-');
        console.log(contact.value);
        console.log(contact.contact_type);
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
        console.log('first_name ' + $scope.person.first_name);
        console.log('last_name ' + $scope.person.last_name);
        console.log('address ' + $scope.person.address);
        console.log('birth_date ' + $scope.person.birth_date);
        console.log('contacts ' + $scope.person.contacts);
        console.log(($scope.person.first_name && $scope.person.last_name && $scope.person.address &&
                    $scope.person.birth_date && $scope.person.contacts.length > 0));
        return ($scope.person.first_name && $scope.person.last_name && $scope.person.address &&
                $scope.person.birth_date && $scope.person.contacts.length > 0);
    }

    ///////////////////////////////////// save person and contacts /////////////////////////////

    $scope.submit = function(person){
        console.log('submit de persona-----');
        console.log(person);
//        var data_to_send = {'title': promotion.title, 'from_date': $filter('date')(promotion.start_date,'yyyy-MM-ddTHH:mm'),
//                            'to_date': $filter('date')(promotion.end_date,'yyyy-MM-ddTHH:mm'), 'website': promotion.web_site,
//                            'promotion_options': $scope.promotion_options, 'description': promotion.description,
//                            'disclaimer': promotion.disclaimer, 'banner': promotion.banner, 'logo': promotion.logo}
//        Upload.upload({
//            method: 'POST',
//            url: '/api/v1/promotion/',
//            data: data_to_send,
//          }).then(
//            function(res) {
//                $uibModalInstance.dismiss('cancel');
//                $rootScope.$broadcast('promotionsReload');
//            },
//            function(response) {
//                if (response.data){
//                    var msg = '';
//                    Object.getOwnPropertyNames(response.data).forEach(function(val, idx, array) {
//                        msg = msg + val + ': ' + response.data[val] + '--';
//                    });
//                }else {
//                    msg = "An error has occurred, please try again later";
//                };
//                $scope.msg = msg;
//            });
    }
}]);