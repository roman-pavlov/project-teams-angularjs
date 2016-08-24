angular.module('projTeams.manageTeams.refreshTeamTab', [
    'ui.bootstrap',
    'ngRoute',
    'projTeams.services.teamService',
    'projTeams.directives.typeaheadTagManager'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/refreshTeam', {
            templateUrl: 'manageTeams/refreshTeamTab.html',
            controller: 'projTeams.manageTeams.refreshTeamTab.RefreshTeamsCtrl',
            controllerAs: "ctrl"
        })
        .when('/refreshTeam/:team', {
            templateUrl: 'manageTeams/refreshTeamTab.html',
            controller: 'projTeams.manageTeams.refreshTeamTab.RefreshTeamsCtrl',
            controllerAs: "ctrl"
        });
}])
    .controller('projTeams.manageTeams.refreshTeamTab.RefreshTeamsCtrl', [  '$scope','TeamService', function ($scope, teamService) {
        var self = this;
        //self.teamName = $routeParams.team;
        var setTeam = function(){
            self.teamName = (teamService.getTeam())? teamService.getTeam().name:'';
        };

        setTeam();
        self.loadingMembers = false;

        self.refreshClick = function() {
            if (angular.isString(self.selectedMembers) && self.selectedMembers !== '') {
                teamService.refreshTeam(self.selectedMembers.split(','));
            }
        };

        $scope.$on('teamUpdated', setTeam);
    }]);



