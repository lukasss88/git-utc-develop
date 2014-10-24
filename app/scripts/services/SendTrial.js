/**
 * Created by nigatsu on 14.09.14.
 */
(function () {
    'use strict';

    function SendTrial($modal, $scope) {
        return {
            send: function (test) {
                $scope.test = test;
                return $modal.open({
                    templateUrl: 'views/dialogSendTrial.html',
                    backdrop: true,
                    windowClass: 'modal',
                    controller: function ($scope, $modalInstance, TrialDAO) {
                        $scope.send = function (student) {
                            var trial = {student: student.name, test: $scope.test.title};
                            TrialDAO.save(trial).then($modalInstance.dismiss('cancel'));
                        };
                    },
                    resolve: {
                        user: function () {
                            return $scope.student;
                        }
                    }
                });

            }
        };
    }

    angular.module('utcApp').factory('SendTrial', ['$modal', '$rootScope', 'TrialDAO', SendTrial]);
})();
