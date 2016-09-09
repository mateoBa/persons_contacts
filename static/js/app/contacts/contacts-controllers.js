
var contact_controller = angular.module('contacts.controllers', []);

contact_controller.controller('addPromotionsCtrl', ['$scope', '$filter', 'contactService',
                                                    function($scope, $filter, contactService) {

    $scope.person = {};
    $scope.person.contacts = [];
    $scope.contact = {};
    contactService.getContactTypes.then(
        function(res) {
            console.log(res.data);
            console.log(res.data[0][0])
            $scope_contact_types = res.data;
        },
        function(res){
            alert('An error occurred in server');
        }

    )

    //////////////////////////////////// Contacts ///////////////////////////
    $scope.submit_contact = function(contact){
        if (contact.value && contact.contact_type){
            $scope.person.contacts.push({contact_type: contact.contact_type, value: contact.value});
        }
    }

    $scope.delete_item = function(idx){
        $scope.person.contacts.splice(idx, 1);
    }
    ///////////////////// valid form ////////////////////////////////
    function is_form_valid() {
        var dates = false; var options = false; var descriptions = false; var banner = false;
        if (($scope.promotion.start_date !== undefined) && ($scope.promotion.end_date !== undefined)){
            if ($scope.promotion.start_date <= $scope.promotion.end_date) {
                dates = true;
                $scope.dates_error = false;
            }else {
                $scope.dates_error = true;
            }
        }
        options = ($scope.promotion_options !== undefined && $scope.promotion_options.length > 0);
        descriptions = (($scope.promotion.disclaimer !== undefined && $scope.promotion.disclaimer.length > 5) &&
                        ($scope.promotion.description !== undefined && $scope.promotion.description.length > 5));
        banner = ($scope.promotion.banner !== undefined);
        if (dates && options && descriptions && banner){
            return true;
        }
        return false;
    }
    $scope.form_valid = function(){
        return is_form_valid();
    }

    ///////////////////////////////////// save promotion /////////////////////////////

    $scope.se_guardo = false;
    $scope.save_promotion = function(promotion){
        var data_to_send = {'title': promotion.title, 'from_date': $filter('date')(promotion.start_date,'yyyy-MM-ddTHH:mm'),
                            'to_date': $filter('date')(promotion.end_date,'yyyy-MM-ddTHH:mm'), 'website': promotion.web_site,
                            'promotion_options': $scope.promotion_options, 'description': promotion.description,
                            'disclaimer': promotion.disclaimer, 'banner': promotion.banner, 'logo': promotion.logo}
        Upload.upload({
            method: 'POST',
            url: '/api/v1/promotion/',
            data: data_to_send,
          }).then(
            function(res) {
                $uibModalInstance.dismiss('cancel');
                $rootScope.$broadcast('promotionsReload');
            },
            function(response) {
                if (response.data){
                    var msg = '';
                    Object.getOwnPropertyNames(response.data).forEach(function(val, idx, array) {
                        msg = msg + val + ': ' + response.data[val] + '--';
                    });
                }else {
                    msg = "An error has occurred, please try again later";
                };
                $scope.msg = msg;
            });
    }
}]);