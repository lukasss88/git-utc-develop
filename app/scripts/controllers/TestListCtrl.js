(function ()
{
    'use strict';

    function TestListCtrl($scope, TestDAO, paginationSupport)
    {
        var ctrl = this;

        this.register = [];
        this.filter = {query: null, size: 8};

        this.isTestsTableEmpty = function ()
        {
            return !ctrl.register || ctrl.register.length === 0;
        };

        this.markTest = function (id)
        {
            $scope.$broadcast('test-selected', id);
            ctrl.selectedId = id;
        };

        this.isTestSelect = function (id)
        {
            return id === ctrl.selectedId;
        };

        this.createTest = function ()
        {
            var test = {title: ctrl.filter.query};
            TestDAO.save(test).then(function (data)
            {
                refreshTests();
                ctrl.selectTest(data.id);
            });
        };

        var refreshTests = paginationSupport(this, function (callback)
        {
            TestDAO.query(ctrl.filter).then(function (result)
            {
                callback(result.total);
                ctrl.register = result.results;
            });
        });

        $scope.$on('test-saved', refreshTests);
        $scope.$on('test-deleted', refreshTests);
        $scope.$on('task-deleted', refreshTests);

        refreshTests();
    }

    var module = angular.module('utcApp');
    module.controller('TestListCtrl', [ '$scope', 'TestDAO', 'paginationSupport', TestListCtrl]);

})();
