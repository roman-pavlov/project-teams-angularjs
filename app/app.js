'use strict';

// Declare app level module which depends on views, and components
angular.module('projTeams', [
    'ngRoute',
    'projTeams.teams',
    'projTeams.manageTeams.refreshTeamTab',
    'projTeams.manageTeams.membersTab',
    'myApp.version'
]).
    config(['$routeProvider', function ($routeProvider) {

        $routeProvider.otherwise({redirectTo: '/refreshTeam'});
    }])
.controller('ProjTeamsAppController',['$location',function($location){
        var self = this;

        //self.isActive = function(path)
        //{
        //    return $location.path() === path? 'active':'';
        //}
        self.navigate = function(path){
            $location.path(path);
        };
    }]);

